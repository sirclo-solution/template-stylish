import 
  Document, 
  { Html, Main } 
from 'next/document';
import { CriticalCssHead } from 'components/CustomScript/CriticalCssHead'
import { DeferredNextScript } from 'components/CustomScript/DeferredNextScript'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const language = ctx.query.lng
    return { ...initialProps, language }
  }

	render() {
		return (
			<Html lang={this.props.language}>
        <CriticalCssHead />
				<body>
					<Main />
          <DeferredNextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument;