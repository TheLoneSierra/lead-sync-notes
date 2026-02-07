import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  const leads = data.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone
  }));

  return NextResponse.json(leads);
}
