import {
	QAPLA_DISCORD_WEBHOOK_URL,
	DISCORD_GAME_IMAGE_PLACEHOLDER
} from '../utilities/Constants';

/**
 * Publish a deeplink from a MatchCard to Discord
 * @param {object} ctx 	   Context object with infornation about the match
 */
export async function discordPublishMessageToChannel(ctx) {
	try {
		const { game, platform, winBet, url, discordImg, discordTag } = ctx;

		const imgUri = (discordImg) ? discordImg : DISCORD_GAME_IMAGE_PLACEHOLDER;

		let response = await fetch(QAPLA_DISCORD_WEBHOOK_URL, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				content: `Game: **${game}**  Platform: **${platform}** \n#Qoins to win: **${winBet}**  Creator: **${discordTag}**\n***Match link***: ${url}`,
            	username: "Qapla Match Announcer",
				tts: false,
				embeds: [{
                  image: {
                  	url: imgUri
                  }
                }] 
			})
		});

		response.json();
	}
	catch(error) {
		console.error(error);
	}
}