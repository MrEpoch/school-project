"use client";

import { useState } from "react";

export default function Accordion() {
  const [active, setActive] = useState({
    first: false,
    second: false,
    third: false,
  });

  return (
    <div
      id="accordion-color"
      data-accordion="collapse"
      data-active-classes="bg-lime-100 dark:bg-gray-800 text-lime-600 dark:text-white"
    >
      <h2 id="accordion-color-heading-1">
        <button
          onClick={() => setActive({ ...active, first: !active.first })}
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-800 dark:border-gray-700 dark:text-gray-400 hover:bg-lime-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target="#accordion-color-body-1"
          aria-expanded="true"
          aria-controls="accordion-color-body-1"
        >
          <span>What is our purpose?</span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-color-body-1"
        className={active.first ? "block" : "hidden"}
        aria-labelledby="accordion-color-heading-1"
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            At Serenity, our mission is to revolutionize the way influencers and
            brands connect and collaborate.{" "}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            We believe in the power of authentic partnerships and strive to
            create meaningful connections that drive real results.
          </p>
        </div>
      </div>
      <h2 id="accordion-color-heading-2">
        <button
          onClick={() => setActive({ ...active, second: !active.second })}
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-800 dark:border-gray-700 dark:text-gray-400 hover:bg-lime-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target="#accordion-color-body-2"
          aria-expanded="false"
          aria-controls="accordion-color-body-2"
        >
          <span>Who we are?</span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-color-body-2"
        className={active.second ? "block" : "hidden"}
        aria-labelledby="accordion-color-heading-2"
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Serenity is a cutting-edge platform that bridges the gap between
            influencers and brands.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            We provide a seamless and efficient environment where influencers
            can discover exciting sponsorship opportunities and brands can find
            the perfect partners to amplify their message.
          </p>
        </div>
      </div>
      <h2 id="accordion-color-heading-3">
        <button
          onClick={() => setActive({ ...active, third: !active.third })}
          type="button"
          className={`${active.third ? "" : "rounded-b"} flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-800 dark:border-gray-700 dark:text-gray-400 hover:bg-lime-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-color-body-3" aria-expanded="false" aria-controls="accordion-color-body-3`}
        >
          <span>What we do?</span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-color-body-3"
        className={active.third ? "block" : "hidden"}
        aria-labelledby="accordion-color-heading-3"
      >
        <div className="p-5 border border-t-0 rounded-b border-gray-200 dark:border-gray-700">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Our platform simplifies the process of influencer marketing by
            offering a curated marketplace where influencers and brands can
            easily find each other.{" "}
          </p>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Whether you're a social media star looking for your next
            collaboration or a brand seeking to reach a new audience, Serenity
            is the ultimate destination for impactful partnerships.
          </p>
        </div>
      </div>
    </div>
  );
}
