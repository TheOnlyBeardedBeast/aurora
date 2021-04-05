const { withAuth } = require("../../../../../utils/hof/withAuth");
const percentage = require("../../../../../utils/percentage");

const handleGet = async (req, res) => {
  const { range, seed } = req.query;

  const rows = await db("events")
    .select("element")
    .count("events.id as views")
    .countDistinct("hash as unique")
    .join("websites", "events.website_id", "websites.id")
    .whereRaw(`events.created_at >= DATE_TRUNC('${range}', now())`)
    .where("websites.seed", seed)
    .groupBy("element")
    .orderBy("views", "desc");

  const totalViews = rows.reduce((acc, el) => acc + el.views, 0);

  const data = rows.map((el) => {
    const perc = percentage(el.views, totalViews);

    return {
      element: el.element,
      views: el.views,
      unique: el.unique,
      percentage: perc,
    };
  });

  return { status: 200, data: data };
};

const handle = async function (req, res) {
  let { status, data } = {};

  switch (req.method) {
    case "GET":
      ({ status, data } = await handleGet(req, res));
      break;
    default:
      return res.status(405).json({ message: "Method not allowed." });
  }

  return res.status(status).json({ data: data });
};

module.exports = withAuth(handle); // XXX Todo withSharedAuth
