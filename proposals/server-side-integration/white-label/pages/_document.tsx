import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from "next/document";
import { getCriticalAssets } from "@framework/design-system";

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		const { styles } = getCriticalAssets();

		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					{styles.map(({ content, keys }, index) => {
						return (
							<style
								key={index}
								data-coulis={keys}
								// eslint-disable-next-line react/no-danger
								dangerouslySetInnerHTML={{ __html: content }}
							/>
						);
					})}
				</>
			),
		};
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
