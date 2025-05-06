import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import { KhulnasoftComponent, khulnasoft, useIsPreviewing } from '@khulnasoft.com/react';

import './index.css';

// Put your API key here
khulnasoft.init('YOUR_API_KEY');

function App() {
  const [allPages, setAllPages] = useState([]);

  useEffect(() => {
    async function getStaticProps() {
      const pages = await khulnasoft.getAll('page', {
        fields: 'data.url,name',
        options: { noTargeting: true },
      });
      setAllPages(pages);
    }
    getStaticProps();
  }, []);

  return (
    <BrowserRouter>
      <header>
        <div className="logo">MY SITE</div>
        <div className="links">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/about">
            About
          </Link>
          {allPages.map(page => {
            return (
              <Link className="link" to={page.data.url}>
                {page.name}
              </Link>
            );
          })}
          <Link className="link" to="/404">
            404
          </Link>
        </div>
      </header>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route render={({ location }) => <CatchAllRoute key={location.key} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default function CatchAllRoute() {
  const isPreviewingInKhulnasoft = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);

  // get the page content from Khulnasoft
  useEffect(() => {
    async function fetchContent() {
      const content = await khulnasoft
        .get('page', {
          url: window.location.pathname,
        })
        .promise();

      setContent(content);
      setNotFound(!content);
    }
    fetchContent();
  }, []);

  // if no page is found, return a 404 page
  if (notFound && !isPreviewingInKhulnasoft) {
    return <NotFound />; // Your 404 content
  }

  // return the page when found
  return (
    <>
      {/* Render the Khulnasoft page */}
      <KhulnasoftComponent model="page" content={content} />
    </>
  );
}

const Home = () => <h1>I am the homepage!</h1>;
const About = () => <h1>I am the about page!</h1>;
const NotFound = () => <h1>No page found for this URL, did you publish it?</h1>;

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
