import React, { Component, Fragment } from 'react';
import { format } from 'date-fns';
import { css } from 'emotion';
// eslint-disable-next-line
import globalStyles, { styles } from './Styles';

class Post extends Component {
  state = {
    post: null,
    relationships: null,
  };

  componentDidMount() {
    const { postID } = this.props.match.params;
    fetch(
      `https://unlikelycomputer.matthewgrill.com/jsonapi/node/photo_journal/${postID}?sort=-created&include=${[
        'field_photos',
        'field_photo_journal_tags',
      ].join(',')}`,
    )
      .then(res => res.json())
      .then(({ data: post, included }) =>
        this.setState({
          post,
          relationships: included.reduce((acc, cv) => {
            acc[cv.type] = acc[cv.type] || {};
            acc[cv.type][cv.id] = cv;
            return acc;
          }, {}),
        }),
      );
  }

  buildPost = ({
    id,
    attributes,
    relationships: {
      field_photos: fieldPhotos,
      field_photo_journal_tags: fieldTags,
    },
  }) => {
    const { relationships } = this.state;
    return (
      <article key={id}>
        <p className={styles.meta}>
          {format(new Date(attributes.created), 'MM/DD/YYYY')}
          {' — '}
          {fieldTags.data
            .map(
              ({ id: tagID }) =>
                relationships['taxonomy_term--tags'][tagID].attributes.name,
            )
            .join(' ')}
        </p>
        {fieldPhotos.data.map(({ id: photoID }) => (
          <img
            className={styles.img}
            key={relationships['file--file'][photoID].id}
            src={relationships['file--file'][photoID].attributes.uri.url}
            alt={relationships['file--file'][photoID].attributes.filename}
          />
        ))}
      </article>
    );
  };

  render() {
    const { post, relationships } = this.state;
    return (
      <Fragment>
        {post && relationships ? (
          this.buildPost(post)
        ) : (
          <p
            className={css`
              ${styles.p} ${styles.loading};
            `}
          >
            loading
          </p>
        )}
      </Fragment>
    );
  }
}

export default Post;
