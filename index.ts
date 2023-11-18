import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// we create a new user
	const newUser = await prisma.user.create({
		data: {
			email: 'hello@herewecode.io',
			username: 'gaelgthomas', //<- its my Twitter name
		},
	});
	console.log('New User:');
	console.log(newUser);

	// create a new tweet and link to the user
	const firstTweet = await prisma.tweet.create({
		data: {
			text: 'Hello World!',
			userId: newUser.id,
		},
	});
	console.log('First Tweet:');
	console.log(firstTweet);

	// we fetch the new user again by unique email
	// and ask to fetch its tweets at the same time
	const newUserWithTweets = await prisma.user.findUnique({
		where: {
			email: 'hello@herewecode.io',
		},
		include: { tweets: true },
	});

	console.log('user object with tweets:');
	console.dir(newUserWithTweets);
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
