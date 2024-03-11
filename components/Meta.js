import Head from 'next/head';
import { env_variable } from '../env';

const Meta = ({title, keywords, desciption, children}) => {
  return (
    <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://kit.fontawesome.com/c6fba17c0d.js" crossorigin="anonymous"></script>

        <script defer src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

        <link rel="shortcut icon" href= {env_variable.SHORT_ICON_BAR} />
        <link rel="icon" href= {env_variable.SHORT_ICON_BAR}></link>
        <link rel="apple-touch-icon" href= {env_variable.SHORT_ICON_BAR}></link>
        <link rel="apple-touch-icon-precomposed" href= {env_variable.SHORT_ICON_BAR}></link>

        <title>{title}</title>

        {children}
    </Head>
  )
}

Meta.defaultProps = {
    title: "ForumDB",
    keywords: "Dien Dan Anime",
    desciption: "Welcome to the Forum comunity"
}

export default Meta
