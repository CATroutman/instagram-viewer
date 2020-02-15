import React, { Component, Fragment } from 'react';
import classes from './InstaViewer.module.css';
import InstaHeader from './InstaHeader/InstaHeader';
import InstaImage from './InstaImage/InstaImage';
import InstaCaption from './InstaCaption/InstaCaption';
import InstaThumbs from './InstaThumbs/InstaThumbs';
import Spinner from './Spinner/Spinner';
import axios from 'axios';

const postUrl = 'https://instagram.com/'
const toJSON = '/?__a=1';

class InstaViewer extends Component {

    state = {
        posts: [],
        thumbs: [],
        current: 0,
        profile: '',
        loading: true,
        is_private: false
    }

    componentDidMount() {
        this.setState({loading: true});
        this.fetchPostData();
    }

    fetchPostData = () => {
        axios.get(postUrl + this.props.username + toJSON)
            .then(response => {
                
                const profile = response.data.graphql.user.profile_pic_url;                

                // check if the user profiler provided is a private acount
                if (response.data.graphql.user.is_private) {
                    this.setState({profile: profile, is_private: true, loading: false});
                    return;
                }

                const posts = [];
                const thumbs = [];
                const instaPosts = response.data.graphql.user.edge_owner_to_timeline_media.edges;

                let numPosts = instaPosts.length;

                if (numPosts > 0) {
                    if (numPosts > 5) {
                        numPosts = 5;
                    }
                    for (let i = 0; i < numPosts; i++) {
                        const type = instaPosts[i].node.__typename;
                        const src = instaPosts[i].node.display_url;
                        const location = instaPosts[i].node.location === null ? null : instaPosts[i].node.location.name;
                        const thumb = instaPosts[i].node.thumbnail_resources[0].src;
                        const caption = instaPosts[i].node.edge_media_to_caption.edges[0].node.text;

                        if (type === 'GraphVideo') {
                            const shortcode = instaPosts[i].node.shortcode;
                            this.fetchVideoURL(shortcode, i);
                        }

                        const postObj = {
                            src: src,
                            mediaType: type,
                            caption: caption,
                            location: location
                        };

                        posts.push(postObj);
                        thumbs.push(thumb);
                    }
                }

                this.setState({
                    posts: posts,
                    thumbs: thumbs,
                    profile: profile,
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    fetchVideoURL = (shortcode, index) => {
        
        let video_url = null;

        axios.get(postUrl + 'p/' + shortcode + toJSON)
            .then(response => {
                video_url = response.data.graphql.shortcode_media.video_url;
                const posts = [...this.state.posts];
                posts[index].src = video_url;
                this.setState({posts: posts});
            })
            .catch(error => {
                console.log(error);
            })
    }

    onThumnailClicked = (index) => {
        this.setState({current: index});
    }

    render() {
        let posts = 'loading';

        if (this.state.loading) {
            posts = (
                <div style={{height: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Spinner />
                </div>
            );
        }
        else {
            const curPost = this.state.posts[this.state.current];

            if (this.state.posts.length < 1) {
                posts = (
                    <Fragment>
                        <InstaHeader username={this.props.username} profile={this.state.profile} />
                        <div className={classes.Private}>
                            <p>This account has no posts yet.</p>
                        </div>
                    </Fragment>
                );
            }
            else if (this.state.is_private) {
                posts = (
                    <Fragment>
                        <InstaHeader username={this.props.username} profile={this.state.profile} />
                        <div className={classes.Private}>
                            <p>This account is private</p>
                        </div>
                    </Fragment>
                );
            } else {
                posts = (
                    <Fragment>
                        <InstaHeader username={this.props.username} profile={this.state.profile} location={curPost.location} />
                        <InstaImage src={curPost.src} mediaType={curPost.mediaType} />
                        <InstaCaption username={this.props.username} caption={curPost.caption}/>
                        <InstaThumbs thumbs={this.state.thumbs} clicked={this.onThumnailClicked} current={this.state.current}/>
                    </Fragment>
                );
            }
        }

        return (
            <div className={classes.InstaViewer}>
                {posts}
            </div>
        );
    }
};

export default InstaViewer;