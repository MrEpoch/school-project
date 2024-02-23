"use client";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";

export default function PhoneNumber() {
  const [value, setValue] = useState();
  return (
    <>
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        required
        onChange={setValue}
      />
      <input type="hidden" required name="company_phone" value={value} />
    </>
  );
}
