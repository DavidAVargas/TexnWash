import Link from "next/link";
import { format } from "date-fns";
import { connectDB } from "@/lib/mongodb";
import { PhotoSet, type IPhotoSet } from "@/lib/models/PhotoSet";
import { SearchablePhotoList } from "./_components/SearchablePhotoList";

interface GroupedCustomer {
  customerName: string;
  customerEmail: string;
  photoSets: IPhotoSet[];
}

export default async function AdminPhotosPage() {
  await connectDB();
  const raw = await PhotoSet.find().sort({ customerEmail: 1, jobDate: -1 }).lean();
  const allSets: IPhotoSet[] = JSON.parse(JSON.stringify(raw));

  const grouped = allSets.reduce<Record<string, GroupedCustomer>>((acc, set) => {
    if (!acc[set.customerEmail]) {
      acc[set.customerEmail] = {
        customerName: set.customerName,
        customerEmail: set.customerEmail,
        photoSets: [],
      };
    }
    acc[set.customerEmail].photoSets.push(set);
    return acc;
  }, {});

  const customers = Object.values(grouped);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <a href="/admin" className="text-sm text-[#BD5700] hover:underline">
            ← Dashboard
          </a>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Before &amp; After Photos</h1>
          <p className="text-sm text-gray-500 mt-1">
            {customers.length} customer{customers.length !== 1 ? "s" : ""} · {allSets.length} job{allSets.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/photos/new"
          className="bg-[#BD5700] hover:bg-[#BD5700]/90 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
        >
          + New Job
        </Link>
      </div>

      <SearchablePhotoList customers={customers} />
    </div>
  );
}
