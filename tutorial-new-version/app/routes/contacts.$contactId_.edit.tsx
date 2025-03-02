import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getContact, updateContact } from "../data";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");

  const contact = await getContact(params.contactId);

  if (!contact) {
    throw new Response("Not found", { status: 404 });
  }

  return json({ contact });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");

  const formData = await request.formData();

  const updates = Object.fromEntries(formData);

  await updateContact(params.contactId, updates);

  return redirect(`/contacts/${params.contactId}`, { status: 301 });
};

export default function EditContact() {
  const { contact } = useLoaderData<typeof loader>();
  const navigate = useNavigate(); 

  return (
    <Form key={contact.id} method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          type="text"
          name="first"
          defaultValue={contact.first}
          placeholder="First"
          aria-label="First Name"
        />
        <input
          type="text"
          name="last"
          defaultValue={contact.last}
          placeholder="Last"
          aria-label="Last Name"
        />
      </p>
      <label>
        <span>Instagram</span>
        <input
          type="text"
          name="instagram"
          defaultValue={contact.instagram}
          placeholder="@Instagram"
        />
      </label>
      <label>
        <span>Avatar</span>
        <input
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar Url"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <label>
        <span>Followers</span>
        <input
          type="text"
          name="followers"
          defaultValue={contact.followers}
          placeholder="Number of followers"
          aria-label="Followers"
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button> {/* Redirige hacia atrás */}
      </p>
    </Form>
  );
};