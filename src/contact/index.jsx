import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Instagram, LoaderCircle, TwitterIcon } from "lucide-react";
import React, { useState } from "react";
import { CreateQuery } from "../../services/GlobalApi";
import { toast, Toaster } from "sonner";
import Header from "@/components/custom/Header";

function Contect() {
  const [formData, setFormdata] = useState({});
  const [loader, setLoader] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };

  const saveQuery = (e) => {
    e.preventDefault();
    setLoader(true);
    CreateQuery({
      data: formData,
    })
      .then((res) => {
        setLoader(false);
        toast("Your Query submitted, we will connect soon.");
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  return (
    <div>
      <Header />

      <div className="flex flex-wrap shadow-lg rounded-lg border-t-primary border-t-4 m-20 font-sans text-gray-700 ">
        <div className="p-10">
          <h2 className="font-bold text-3xl text-gray-700">Contact Us</h2>
          <p className="text-gray-500">
            We are here to help you. Please fill out the form below and we will
            get back to you as soon as possible.
          </p>
        </div>
        <div className="p-10 flex flex-1/2 items-center text-gray-700 font-sans justify-center">
          <div className="m-10 p-10 w-full max-w-md rounded-lg border border-y-0">
            <h2 className="font-bold text-2xl pb-2">Contact Form</h2>
            <form onSubmit={saveQuery}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">
                    Name<span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm">
                    Message<span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="message"
                    required
                    onChange={handleChange}
                  ></Textarea>
                </div>
                <Button
                  type="submit"
                  className="text-white p-2 rounded cursor-pointer"
                >
                  {loader ? <LoaderCircle /> : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="p-10 flex flex-1/2 items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="font-bold text-2xl pb-5">Contact Information</h2>
            <p className="p-2">
              If you have any questions, please feel free to contact us at:
            </p>
            <div className="p-2 flex gap-2 flex-col">
              <p>
                Email:<span className="font-bold"> </span>
                <a
                  href="mailto:charuchetan.20@gmail.com"
                  className="text-blue-500"
                >
                  example@mail.com
                </a>
              </p>
              <p>
                Phone: <span className="font-bold"> </span>
                <a href="tel:+919999999999" className="text-blue-500">
                  +919999999999
                </a>
              </p>
              <p>
                Address: <span className="font-bold"> </span>
                <a href="https://goo.gl/maps/xyz" className="text-blue-500">
                  1234 Street Name, City, State, Zip
                </a>
              </p>
              <p>Follow us on social media:</p>
              <p className="flex flex-wrap gap-10">
                <a href="https://www.facebook.com">
                  <Facebook />
                </a>
                |
                <a href="https://www.twitter.com">
                  <TwitterIcon />
                </a>
                |
                <a href="https://www.instagram.com">
                  <Instagram />
                </a>
              </p>
              <p>We look forward to hearing from you!</p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Contect;
