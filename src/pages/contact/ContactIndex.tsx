import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../../redux/reducers";
import { getMyPayments } from "../../redux/actions/payment.action";
import { GenericObject } from "../../interfaces";
import {
  BsPinMap as LocationIcon,
  BsMailbox2 as MailIcon,
  BsPhone as PhoneIcon,
} from "react-icons/bs";

function ContactIndex() {
  const dispatch = useDispatch<any>();
  const authenticatedUser = useSelector(
    (state: StoreState) => state?.Auth?.userProfile
  );

  console.log(authenticatedUser);

  useEffect(() => {
    dispatch(getMyPayments({}));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-4 py-4 rounded-xl gap-2 bg-white w-1/3 ">
          <div className="rounded-lg border py-4 px-5">
            <div className="flex flex-row justify-between items-start mb-4">
              <h3 className="font-bold text-2xl">Contact Information</h3>
            </div>

            <div className="flex flex-col md:flex-row text-sm gap-0 md:gap-6 items-center justify-between w-full text-[#818793] mb-6">
              Need support with the online application? Contact us with the
              informations below:
            </div>

            <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
              <FieldComponent
                icon={<MailIcon style={{ fontSize: "18px" }} />}
                label="Email Address"
                value={"admissions@ghschools.online"}
                sx={{ marginBottom: "10px" }}
                width="100%"
              />

              <FieldComponent
                icon={<PhoneIcon style={{ fontSize: "18px" }} />}
                label="Phone Number (Whatsapp)"
                value={"+233 26 871 2345"}
                sx={{ marginBottom: "10px" }}
                width="100%"
              />

              <FieldComponent
                icon={<PhoneIcon style={{ fontSize: "18px" }} />}
                label="Alt. Phone Number 1"
                value={"+233 30 242 4909"}
                sx={{ marginBottom: "10px" }}
                width="100%"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-between w-full">
              <FieldComponent
                icon={<PhoneIcon style={{ fontSize: "18px" }} />}
                label="Alt. Phone Number 2"
                value={"+233 27 762 2250"}
                sx={{ marginBottom: "10px" }}
                width="100%"
              />

              <FieldComponent
                icon={<PhoneIcon style={{ fontSize: "18px" }} />}
                label="Alt. Phone Number 3"
                value={"+233 54 462 2250"}
                sx={{ marginBottom: "10px" }}
                width="100%"
              />

              <FieldComponent
                icon={<LocationIcon style={{ fontSize: "18px" }} />}
                label="Location"
                value={
                  "Achimota Accra near Achimota New Transport Terminal and Adjacent the Achimota ICGC"
                }
                sx={{ marginBottom: "10px" }}
                width="100%"
              />
            </div>

            <div className="flex flex-col gap-0 items-center justify-between w-full mt-2">
              <div
                className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-center bg-slate-100 w-full border rounded-md text-sm"
                style={{ marginBottom: "12px" }}
              >
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1985.3239129357248!2d-0.2278726!3d5.6189061!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf99519d280a59%3A0xd2c0850c11243fa4!2sGH%20Schools!5e0!3m2!1sen!2sng!4v1722949962905!5m2!1sen!2sng"
                  width="800"
                  height="300"
                  style={{ border: "none" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                >
                  <a
                  href="https://maps.app.goo.gl/pbFfcnTJoVm9KRXE7"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  View location on map
                </a>
                </iframe>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const FieldComponent: React.FC<{
  width: string;
  label: string;
  value: string;
  sx?: GenericObject;
  icon?: any;
}> = ({ width, label, sx = {}, value = "", icon, ...rest }) => {
  return (
    <div className="flex flex-col items-start text-lg" style={{ width, ...sx }}>
      <div className="flex flex-row items-center gap-2 mb-1 w-full">
        {icon}
        <span
          style={{
            width: "auto",
            fontSize: "12px",
            fontWeight: 500,
            color: "#818793",
            // marginBottom: "3px",
            textTransform: "capitalize",
          }}
        >
          {label}
        </span>
      </div>

      <div
        style={{
          fontSize: "14px",
          fontWeight: 700,
          padding: "5px 0px",
        }}
        {...rest}
      >
        {value}
      </div>
    </div>
  );
};

export default ContactIndex;
