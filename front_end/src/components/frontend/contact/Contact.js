import ContactUs from "./ContactUs";
import Content from "./Content";

export default function Contact() {
  return (
    <>
      <Content />
      <div style={{ width: "100%" }}>
        <iframe
          width="100%"
          height="600"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Hu%E1%BA%BF+(My%20Business%20Name)&amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          {/* <a href="https://www.gps.ie/">gps trackers</a> */}
        </iframe>
      </div>
      <ContactUs />
    </>
  );
}
