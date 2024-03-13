"use client";
import ImageComponents from "@/components/ImageComponents";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

export default function FormWithState() {
  const [formState, setFormState] = useState({
    title: "",
    price: 50,
    description: "",
  });

  useEffect(() => {
    const storedFormState = localStorage.getItem("formState");
    if (storedFormState) {
      const JsonformState = JSON.parse(storedFormState);
      console.log(JsonformState);
      const zodSchema = z.object({
        title: z.string(),
        price: z.number(),
        description: z.string(),
      });

      const result = zodSchema.safeParse(JsonformState);
      if (result.success) {
        setFormState(result.data);
      } else {
        console.log(result.error);
      }
    }
  }, []);

  function handleChange(value: string, v: string) {
    setFormState((prev) => ({ ...prev, v: value }));
    localStorage.setItem("formState", JSON.stringify(formState));
  }

  return (
    <form
      method="POST"
      action="/auth/sponsorship/api/basic"
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
            minLength={5}
            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-lime-600 focus:border-lime-600 block w-full p-2.5 dark:bg-darkmode-400  dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
            placeholder="Type product name"
            required
            value={formState.title}
            onChange={(e) => handleChange(e.target.value, "title")}
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
            id="price"
            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-lime-600 focus:border-lime-600 block w-full p-2.5 dark:bg-darkmode-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
            placeholder="$50"
            required
            value={formState.price}
            onChange={(e) =>
              handleChange(parseFloat(e.target.value).toFixed(2), "price")
            }
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
            min={new Date().toISOString().split("T")[0]}
            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-lime-600 focus:border-lime-600 block w-full p-2.5 dark:bg-darkmode-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
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
            defaultValue="cosmetics"
            id="category"
            name="category"
            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-darkmode-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
          >
            <option value="cosmetics">Cosmetics</option>
            <option value="technology">Technology</option>
            <option value="fashion">Fashion</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="h-full w-full py-6 relative sm:col-span-2">
          <div className="relative">
            <ImageComponents />
          </div>
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
            required
            value={formState.description}
            onChange={(e) => handleChange(e.target.value, "description")}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-lime-500 focus:border-lime-500 dark:bg-darkmode-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
            placeholder="Your description here"
            minLength={10}
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
        Create sponsorship
      </button>
    </form>
  );
}
