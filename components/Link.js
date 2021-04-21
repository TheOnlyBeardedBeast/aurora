import { default as NextLink } from "next/link";

export const Link = ({ href, value }) => (
  <NextLink href={href}>
    <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      {value}
    </a>
  </NextLink>
);

Link.defaultProps = {
  href: "#",
  value: "",
};
