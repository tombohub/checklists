export async function action({ request }) {
  const body = await request.formData();
  console.log(body.get("title"));
  return body;
}
