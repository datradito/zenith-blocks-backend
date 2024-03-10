import { GraphQLError } from "graphql";
import Contact from "../../Database/models/Contacts.js";   

const contactResolver = {
    Query: {
        getContacts: async (parent, args, context) => {
            try {
                let contacts;

                if (args && Object.keys(args).length > 0) {
                    // Filter based on 'args' conditions if provided
                    console.log(args);
                    contacts = await Contact.findAll(
                        {
                            where: { ...args.filter },
                        },
                        {
                            sort: {
                                createdAt: "desc",
                            },
                        }
                    );
                } else {
                    // If 'args' conditions are not provided, fetch without any filter
                    contacts = await Contact.findAll({
                        sort: {
                            createdAt: "desc",
                        },
                    });
                }
                return contacts;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    },
    Mutation: {
        submitContact: async (parent, { contact }, context) => {
            try {
                return await Contact.create(contact);
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
    },
};

export default contactResolver;