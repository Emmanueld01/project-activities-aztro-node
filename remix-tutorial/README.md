# Remix Project

This project is based on a Remix template created using npm and Visual Studio Code. It is a list of 10 items, each item being one of the users with the most followers on the social network Instagram, ordered according to the number of followers each user has.

## Installation

To install the dependencies and start the project, follow these steps:

1. Clone this repository from GitHub:
   ```sh
   git clone https://github.com/Emmanueld01/project-activities-aztro-node
   
2. Navigate to the project directory:
```sh
   cd remix-tutorial
```

### Install the dependencies:
   ```sh
   npm install
```


### Start the development server:
   ```sh

npm run dev
```

## Key Concepts
### Links
Links in Remix are created using the Link component from @remix-run/react. They allow navigation between different routes without reloading the page.

#### Code:
   ```sh

import { Link } from "@remix-run/react";

<Link to={`contacts/${contact.id}`}>
  {contact.first || contact.last ? (
    <>
      {contact.first} {contact.last}
    </>
  ) : (
    <i>No Name</i>
  )}
</Link>
```
#### Explanation:
The Link component is used to create links that navigate to different routes within the application without reloading the page. In this example, a link is created that navigates to the dynamic route of a specific contact using the contact's ID.

### Loaders
Loaders are functions that run on the server to load the necessary data for rendering a page.

#### Code:
   ```sh

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getContacts } from "./data";

export const loader = async () => {
  const contacts = await getContacts();
  return json({ contacts });
};
```
#### Explanation:
The loader in this example loads a list of contacts from a simulated "database". The getContacts function retrieves the contacts, and json formats them into a JSON response that is then used by the application.

### Dynamic Routes
Dynamic routes allow for creating routes that can change based on parameters.

#### Code:
   ```sh

import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }) => {
  const { contactId } = params;
  if (!contactId) {
    throw new Error("Contact ID is required");
  }
  const contact = await getContact(contactId);
  return json({ contact });
};
```
#### Explanation:
In this example, the dynamic route uses a contactId parameter to load the specific data for a contact. The getContact function retrieves the contact details based on the ID provided in the route. 

### Nested Routes
Nested routes allow for defining a hierarchy of routes where some routes are children of others.

#### Code:
   ```sh

import { json } from "@remix-run/node";
import { useLoaderData, Link, Outlet } from "@remix-run/react";
import { getContacts } from "./data";

// Loader function
export const loader = async () => {
  const contacts = await getContacts();
  return json({ contacts });
};

// Root component
export default function App() {
  const { contacts } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <Link to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}
                      {contact.favorite ? <span>★</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```
#### Explanation:
In this example, the Outlet component inside the div with the ID detail acts as a placeholder for the nested routes. The contacts list is displayed in the navigation, and each contact links to a specific contact route. When navigating to a contact route, the child component will be rendered inside the div with the ID detail using the Outlet component.

### Outlet Component
The Outlet component is used to render child components in a nested route.

#### Code:
   ```sh

import { Outlet } from "@remix-run/react";

<div id="detail">
  <Outlet />
</div>
```
#### Explanation:
The Outlet component is used in the ROOT file to indicate where the child components should be rendered. In this case, they are rendered in the container with the ID detail.


