import { Typography } from "@material-tailwind/react";

// const LINKS = [
//   {
//     title: "Company",
//     items: ["About Us", "Careers"],
//   },
//   {
//     title: "Pages",
//     items: ["Login", "Register"],
//   },
//   {
//     title: "Legal",
//     items: ["Terms", "Privacy"],
//   },
// ];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-10 px-8 pt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <Typography
            as="a"
            href="https://www.material-tailwind.com"
            target="_blank"
            variant="h4"
            className="mb-6"
          >
            Fala FURIA
          </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
