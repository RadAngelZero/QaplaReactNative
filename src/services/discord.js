import { QAPLA_DISCORD_WEBHOOK_URL } from '../utilities/Constants';

/**
 * Publish a deeplink from a MatchCard to Discord
 * @param {object} ctx 	   Context object with infornation about the match
 */
export async function discordPublishMessageToChannel(ctx) {
	try {
		const { game, platform, bet, url } = ctx;

		let response = await fetch(QAPLA_DISCORD_WEBHOOK_URL, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				content: `Game: **${game}** Platform: **${platform}** #Qoins: **${bet}** \n***Match link***: ${url}`,
            	username: "Qapla Match Announcer",
				tts: false,
				embeds: [{
                  image: {}
                }] 
			})
		});

		response.json();
	}
	catch(error) {
		console.error(error);
	}
}