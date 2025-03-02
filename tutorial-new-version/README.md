# Remix Project V2

This project is based on a Remix template created using npm and Visual Studio Code. It is a list of 10 items, each being one of the accounts with the most followers on the social network Instagram, ordered by the number of followers each account has. Users can edit, delete, and create new items in the list.

## Installation

To install the dependencies and start the project, follow these steps:

1. Clone this repository from GitHub:
   ```sh
   git clone https://github.com/Emmanueld01/project-activities-aztro-node
   
 2. Navigate to the project directory:
```sh
   cd my-remix-app
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
### Actions 
Action functions are used to handle POST and PUT requests from forms, enabling data modifications on the server.

#### Code:
   ```sh
export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await updateContact(params.contactId, updates);

  return redirect(`/contacts/${params.contactId}`, { status: 301 });
};
```
#### Explanation:
In this example, the action function processes form data and updates the corresponding contact. It then redirects the user to the updated contact's page.
### Loaders
Loader functions are used to load the necessary data for rendering a page from the server.

#### Code:
   ```sh
export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");

  const contact = await getContact(params.contactId);

  if (!contact) {
    throw new Response("Not found", { status: 404 });
  }

  return json({ contact });
};
```
#### Explanation:
In this example, the loader function retrieves data for a specific contact from a simulated "database." If the contact is not found, it throws a 404 response.

### useLoaderData
The useLoaderData hook is used to access data loaded by the loader function in a component.
#### Code:
   ```sh
const { contact } = useLoaderData<typeof loader>();
```
#### Explanation:
This hook allows access to the data loaded by the loader function, which in this case includes details of a specific contact.

### useActionData
The useActionData hook is used to access data returned by the action function after an action is performed.
#### Code:
   ```sh
const actionData = useActionData();
```
#### Explanation:
This hook lets you access data returned by the action function, though it is not explicitly used in the provided example.

### invariant
invariant is a function that checks conditions and throws errors if the condition is not met. It ensures the necessary preconditions for a function are satisfied.
#### Code:
   ```sh
invariant(params.contactId, "Missing contactId param");
```
#### Explanation:
Here, invariant checks if the contactId parameter exists. If it doesn't, it throws an error with the message "Missing contactId param."

## Project
The project consists of a contact list where the following actions can be performed:

- Edit Contacts: Update information for an existing contact.

- Delete Contacts: Remove a contact from the list.

- Create New Contacts: Add new contacts to the list.

The project is designed to showcase the top 10 Instagram accounts with the most followers. Each account can be edited, deleted, or complemented with new contact details.