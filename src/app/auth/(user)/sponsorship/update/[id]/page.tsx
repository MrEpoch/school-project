import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import moment from "moment";
import ImageComponentUpdate from "./UpdateImageShown";
import { authChecker } from "@/lib/checkAuth";

async function getSponsorship(id: string) {
  const user = await authChecker();
  try {
    return await prisma.sponsorship.findUnique({
      where: {
        id,
        sponsorId: user?.id,
      },
    });
  } catch (error) {
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const sponsorship = await getSponsorship(params.id);

  if (!sponsorship) {
    return redirect("/auth/sponsorship");
  }

  return (
    <main className="min-h-screen w-full py-8 dark:bg-darkmode-500">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Update sponsorship
        </h2>
        <form
          method="POST"
          action="/auth/sponsorship/api"
          encType="multipart/form-data"
        >
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Sponsorship title
              </label>
              <input
                type="text"
                name="title"
                id="name"
                value={sponsorship.title}
                className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-lime-600 focus:border-lime-600 block w-full p-2.5 dark:bg-darkmode-400  dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                placeholder="Type product name"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Reward amount
              </label>
              <input
                type="number"
                name="reward"
                step="0.01"
                min={50}
                value={sponsorship.amount}
                id="price"
                className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-lime-600 focus:border-lime-600 block w-full p-2.5 dark:bg-darkmode-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                placeholder="$29"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="Expiration date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Expiration date
              </label>
              <input
                type="date"
                name="expires_at"
                className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-lime-600 focus:border-lime-600 block w-full p-2.5 dark:bg-darkmode-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                value={
                  moment(sponsorship.expires_at, "YYYY-MM-DD")
                    .toDate()
                    .toISOString()
                    .split("T")[0]
                }
                placeholder="MM/DD/YYYY"
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-darkmode-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
              >
                <option
                  selected={sponsorship.category === "cosmetics"}
                  value="cosmetics"
                >
                  Cosmetics
                </option>
                <option
                  selected={sponsorship.category === "technology"}
                  value="technology"
                >
                  Technology
                </option>
                <option
                  selected={sponsorship.category === "fashion"}
                  value="fashion"
                >
                  Fashion
                </option>
                <option
                  selected={sponsorship.category === "other"}
                  value="other"
                >
                  Other
                </option>
              </select>
            </div>
            <div className="h-full w-full py-6 relative sm:col-span-2">
              <ImageComponentUpdate imageSrc={sponsorship.image_url} />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sponsorship Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={8}
                value={sponsorship.description}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-lime-500 focus:border-lime-500 dark:bg-darkmode-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                placeholder="Your description here"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full items-center
                        px-5 py-3 mt-4 sm:mt-6 text-sm font-medium text-center
                        text-white bg-lime-700 rounded-lg focus:ring-4 focus:ring-lime-200
                        dark:focus:ring-lime-900 hover:bg-lime-800"
          >
            Update sponsorship
          </button>
        </form>
      </div>
    </main>
  );
}
