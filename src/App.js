import './App.css';
import Container from "react-bootstrap/Container";
import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import twitterLogo from './twitter-blue.png'
import {Input} from "@chakra-ui/core";
import {Button} from "@chakra-ui/core";
import Tweet from 'react-tweet'

function App() {

    const [searchQuery, setSearchQuery] = useState();
    const [isSearching, setIsSearching] = useState(false)
    const [searchResults, setSearchResults] = useState(null);
    const [error, setError]  = useState(false);

    const onSearch = () => {
        if(searchQuery){
            setError(false)
            setIsSearching(true);
            fetch(`/search?q=${searchQuery}`).then(response => response.json()).then(results => {
                console.log(results.tweets);
                setIsSearching(false);
                setSearchResults(results.tweets);
            })
        }else{
            setError(true)
        }
    }
    const linkProps = {target: '_blank', rel: 'noreferrer'}

    return (
        <Container fluid>
            <Row>
                <Col>
                    <img alt='twitter-logo' src={twitterLogo} height={100}/>
                </Col>
            </Row>
            <Row>
                <Col sm={{span: 8, offset: 2}}>
                    <Row>
                        <Col><h4>Search Hashtag</h4></Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <Input isInvalid={error} onChange={e => setSearchQuery(e.target.value)} placeholder="Search hashtag"
                                   isFullWidth/>
                        </Col>
                        <Col sm={4}>
                            <Button onClick={onSearch} isLoading={isSearching} isFullWidth
                                    variantColor='blue'>Search</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className='pt-5' sm={{span: 8, offset: 2}}>
                    {
                        searchResults === null ? <Row className='text-center p-5'>
                            <Col sm={12}><h5>Start searching</h5></Col>
                        </Row> : searchResults.map(tweet => (
                            <Row>
                                <Col sm={{span: 8, offset: 2}}>
                                    <Tweet data={tweet} linkProps={linkProps}/>
                                </Col>
                            </Row>
                        )) || <Row className='text-center p-5'>
                            <Col sm={12}><h5>{`No results for the hashtag ${searchQuery}`}</h5></Col>
                        </Row>
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default App;
