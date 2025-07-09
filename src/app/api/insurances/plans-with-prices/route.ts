import sql from "@/lib/db"; // adjust import path

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const ageParam = url.searchParams.get("age");
    const age = parseInt(ageParam || "");

    if (isNaN(age)) {
      return new Response("Invalid age", { status: 400 });
    }

    const plans = await sql`
      SELECT
        ins.id,
        ins.name,
        ins."timeUnit",
        ins.period,
        p.price
      FROM services.insurances ins
      LEFT JOIN LATERAL (
        SELECT price
        FROM services.insurance_prices
        WHERE insurance = ins.id
          AND "minAge" <= ${age}
          AND "maxAge" >= ${age}
        LIMIT 1
      ) p ON true
      WHERE ins.active = true 
    `;

    console.log("Fetched plans:", plans);

    return Response.json(plans);
  } catch (err) {
    console.error("Error fetching plans with prices:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
