import React from 'react';
import Document, { Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class MyDocument extends Document {
	static getInitialProps({ renderPage }: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
		const styleTags = sheet.getStyleElement();
		return { ...page, styleTags };
	}

	public render() {
		// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
		// @ts-ignore
		const { styleTags } = this.props;

		return (
			<html lang="en">
				<Head>
					<>
						<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
						{styleTags}
					</>
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
