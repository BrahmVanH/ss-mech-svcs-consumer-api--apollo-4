import { MutationResolvers, MutationSendScheduleServiceMessageArgs } from '../generated/graphql';
import { gql } from '@apollo/client/core';
const mutations: MutationResolvers = {
	sendScheduleServiceMessage: async (_: {}, args: MutationSendScheduleServiceMessageArgs, { client }) => {
		const messageContent = args.input;
		if (!messageContent.givenName || !messageContent.familyName || !messageContent.tel || !messageContent.email || !messageContent.location || !messageContent.service || !messageContent.message) {
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
