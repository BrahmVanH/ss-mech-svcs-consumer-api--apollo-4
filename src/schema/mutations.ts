import { MutationResolvers, MutationSendScheduleServiceMessageArgs } from '../generated/graphql';
import { gql } from '@apollo/client/core';
import sanitizer, { SanitizerOptions } from 'perfect-express-sanitizer';

const mutations: MutationResolvers = {
	sendScheduleServiceMessage: async (_: {}, args: MutationSendScheduleServiceMessageArgs, { client }) => {
		// const options: SanitizerOptions = {
		// 	xss: true,
		// 	noSql: true,
		// 	sql: true,
		// 	level: 1,
		// };
		const messageContent = args.input;
		// const sanitizedContent = sanitizer.sanitize(messageContent, options);

		if (
			// !sanitizedContent.givenName ||
			// !sanitizedContent.familyName ||
			// !sanitizedContent.tel ||
			// !sanitizedContent.email ||
			// !sanitizedContent.location ||
			// !sanitizedContent.service ||
			// !sanitizedContent.message
			!messageContent.givenName ||
			!messageContent.familyName ||
			!messageContent.tel ||
			!messageContent.email ||
			!messageContent.location ||
			!messageContent.service ||
			!messageContent.message
		) {
			throw new Error('All fields must be filled to send message');
		}

		try {
			const { data } = await client.mutate({
				mutation: gql`
					mutation SendScheduleServiceMessage($input: ScheduleServiceMessageInput!) {
						sendScheduleServiceMessage(input: $input)
					}
				`,
				variables: {
					input: messageContent,
				},
			});

			if (!data) {
				throw new Error('No data returned from lambda function');
			}

			return data.sendScheduleServiceMessage;
		} catch (err: any) {
			console.error({ message: 'error in sending message', details: err });
			throw new Error('Error in sending message: ' + err.message);
		}
	},
};

export default mutations;
