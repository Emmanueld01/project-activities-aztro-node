import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import type { FunctionComponent } from "react";
import type { ContactRecord } from "../data";

import { getContact } from "../data";

export const loader: LoaderFunction = async ({ params }) => {
  const { contactId } = params as { contactId: string };
  if (!contactId) {
    throw new Error("Contact ID is required");
  }
  const contact = await getContact(contactId);
  if (!contact) {
    throw new Error("Contact not found");
  }
  return json({ contact });
};

export default function Contact() {
  const { contact } = useLoaderData<{ contact: ContactRecord }>();
  return (
    <div id="contact">
      <div>
        <img
          alt={`${contact.first} ${contact.last} avatar`}
          key={contact.avatar}
          src={contact.avatar}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.instagram? (
          <p>
            <a
              href={`https://instagram.com/${contact.instagram}`}
            >
              {contact.instagram}
            </a>
          </p>
        ) : null}

        {contact.followers ? <p>{contact.followers} Followers</p> : null} {/* Mostrar seguidores aquí */}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this record."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Favorite: FunctionComponent<{
  contact: Pick<ContactRecord, "favorite">;
}> = ({ contact }) => {
  const favorite = contact.favorite;

  return (
    <Form method="post">
      <button
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}