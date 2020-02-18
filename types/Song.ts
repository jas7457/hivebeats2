export default interface Song {
	artist: string | null;
	songTitle: string | null;
	streamLink: string | null;
	artwork: {
		altText: string | null;
		sourceUrl: string | null;
		srcSet: string | null;
	} | null;
}
