import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  instagram?: string;
  notes?: string;
  followers?: string;
  favorite?: boolean;
  createdAt?: string; 
};

export type ContactRecord = ContactMutation & {
  id: string;
};

const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("createdAt"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts;
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}

const celebrities = [
  {
    avatar: "https://media.gq.com/photos/56bb4ae4cdf2db6945d2e49e/master/w_320%2Cc_limit/justin-bieber-gq-0316-01.jpg",
    first: "Justin",
    last: "Bieber",
    notes: "Singer",
    followers: "294 mill",
    instagram: "@JustinBieber"
  },
   
  { avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Khloe_Kardashian_2009.jpg/512px-Khloe_Kardashian_2009.jpg", 
    first:"Khloé", 
    last: "Kardashian",  
    notes: "Tv Character",
    followers: "304 mill",
    instagram: "@khloekardashian"
  },

  { avatar: "https://s.abcnews.com/images/GMA/beyonce-ap-jt-220630_1656608386531_hpMain.jpg",
    first: "Beyoncé", 
    last: "Knowles", 
    notes: "Singer",
    followers: "313 mill",
    instagram: "@Beyonce" 
  },

  { avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Kim_Kardashian_2019.jpg/459px-Kim_Kardashian_2019.jpg",
    first: "Kim", 
    last: "Kardashian", 
    notes: "Businesswoman",
    followers: "358 mill",
    instagram: "@KimKardashian" 
  },

  { avatar: "https://resizing.flixster.com/EiW8T62ptFWg3h8Xu5L2sU2dDJ8=/fit-in/1152x864/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/568557_v9_bd.jpg", 
    first: "Ariana", 
    last: "Grande", 
    notes: "Singer",
    followers: "376 mill",
    instagram: "@ArianaGrande" 
  },

  { avatar: "https://upload.wikimedia.org/wikipedia/commons/6/65/Kylie_Jenner_in_2021.jpg",
    first: "Kylie",
    last: "Jenner", 
    notes: "Model",
    followers: "394 mill",
    instagram: "@KylieJenner" 
  },

  { avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/640px-Dwayne_Johnson_2014_%28cropped%29.jpg", 
    first: "Dwayne", 
    last: "Johnson", 
    notes: "Actor",
    followers: "395 mill",
    instagram: "@TheRock" 
  },

  { avatar: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Selena_Gomez_2009.jpg", 
    first: "Selena", 
    last: "Gomez", 
    notes: "Singer",
    followers: "422 mill",
    instagram: "@SelenaGomez" 
  },

  { avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Lionel_Messi_20180626.jpg/336px-Lionel_Messi_20180626.jpg",
    first: "Lionel", 
    last: "Messi", 
    notes: "Footballer",
    followers: "505 mill",
    instagram: "@LeoMessi" 
  },

  { avatar: "https://hips.hearstapps.com/hmg-prod/images/cristiano-ronaldo-of-portugal-reacts-as-he-looks-on-during-news-photo-1725633476.jpg", 
    first: "Cristiano", 
    last: "Ronaldo",
    notes: "Footballer",
    followers: "640 mill", 
    instagram: "@Cristiano" 
  },
];

celebrities.forEach((celebrity, index) => {
  fakeContacts.create({
    ...celebrity,
    id: `${celebrity.first.toLowerCase()}-${celebrity.last.toLowerCase()}`,
    createdAt: new Date(Date.now() - index * 1000).toISOString(),
  });
});
