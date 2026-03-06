"use client";

import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    grecaptcha: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
        }
      ) => number;
      reset: (widgetId: number) => void;
      ready: (callback: () => void) => void;
    };
  }
}

interface ReCaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

export default function ReCaptcha({ onVerify, onExpire }: ReCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);

  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;

  const renderWidget = useCallback(() => {
    if (
      containerRef.current &&
      widgetIdRef.current === null &&
      window.grecaptcha
    ) {
      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
        callback: (token: string) => onVerifyRef.current(token),
        "expired-callback": () => onExpireRef.current?.(),
      });
    }
  }, []);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) return;

    const existingScript = document.querySelector(
      'script[src*="recaptcha/api.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => window.grecaptcha.ready(renderWidget);
      document.head.appendChild(script);
    } else if (window.grecaptcha) {
      window.grecaptcha.ready(renderWidget);
    }
  }, [renderWidget]);

  return <div ref={containerRef} />;
}

export function resetReCaptcha() {
  if (window.grecaptcha && typeof window.grecaptcha.reset === "function") {
    window.grecaptcha.reset(0);
  }
}
