import React, { Component } from 'react';
import axios from 'axios';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import Pagination from 'react-js-pagination';
import './style.css'
import _ from 'lodash';
import Rheostat from 'rheostat';
import { inject, observer } from 'mobx-react';
import $ from 'jquery';
import queryString from 'query-string';

require("bootstrap/less/bootstrap.less");

let currentHotels, indexOfLastHotel, indexOfFirstHotel;
// eslint-disable-next-line
let resetButtonPrice, resetButtonStr, resetButtonDist, resetButtonChain, resetButtonPA, resetButtonRA;
let resetButtonPriceFlg = false, resetButtonStrFlg = false, resetButtonDistFlg = false, resetButtonChainFlg = false, resetButtonPAFlg = false, resetButtonRAFlg = false;
let queries = {}
@inject('Flights')
@observer class Flights extends Component {

    h = new URLSearchParams(this.props.location.search).get('h');
    p = new URLSearchParams(this.props.location.search).get('p');
    s = new URLSearchParams(this.props.location.search).get('s');
    d = new URLSearchParams(this.props.location.search).get('d');
    c = new URLSearchParams(this.props.location.search).get('c');
    pa = new URLSearchParams(this.props.location.search).get('pa');
    ra = new URLSearchParams(this.props.location.search).get('ra');
    sort = new URLSearchParams(this.props.location.search).get('sort');
    sortDir = new URLSearchParams(this.props.location.search).get('sortDir');


    constructor(props) {
        super(props);
        this.Flights = this.props.Flights;

        this.state = {
            activePage: 1,
            itemsCountPerPage: 40,
            resources: [],
            hotel_data: [],
            min: 0,
            max: 0,
            filterStar: [],
            filterDist: [],
            filterChain: [],
            filterPA: [],
            filterRA: [],
            filterPrice: [],
            values: [],
        };
    }
    componentWillMount() {
       
        if (this.p != null) {


            resetButtonPriceFlg = true;
        }

        if (this.s != null) {

            resetButtonStrFlg = true;
        }

        if (this.d != null) {
            resetButtonDistFlg = true;
        }

        if (this.c != null) {
            resetButtonChainFlg = true;
        }


        if (this.pa != null) {
            resetButtonPAFlg = true;
        }

        if (this.ra != null) {
            resetButtonRAFlg = true;

        }
    }
    componentDidMount() {
        console.log(this.refs.searchInput)
        axios.get("http://localhost:5000/flight/hotels")
            .then((response) => {

                this.setState({
                    hotel_data: response.data
                })
                this.Flights.filteredData = _.clone(this.state.hotel_data)

                this.state.hotel_data.forEach(d => {

                    this.Flights.districtInput.push(d.meta.districtId);
                    this.Flights.chainInput.push(d.meta.chainId);
                    d.meta.amenities.roomAmenity.forEach(d2 => {
                        this.Flights.RAInput.push(d2.code)
                    })
                    d.meta.amenities.propertyAmenity.forEach(d2 => {
                        this.Flights.PAInput.push(d2.code)
                    })
                })

                this.state.filterStar.forEach(d => {
                    this.Flights.ratingInput.push(d.code);
                })

                this.values()

            }).catch((error) => {

                console.log(error);
            })

        axios.get("http://localhost:5000/flight/hotels/resources")
            .then((response) => {

                this.setState({
                    resources: response.data,
                    filterStar: response.data[3].value,
                    filterDist: response.data[1].value,
                    filterChain: response.data[0].value,
                    filterPA: response.data[6].value,
                    filterRA: response.data[5].value,
                    filterPrice: response.data[2].value,
                    values: [response.data[2].value.from, response.data[2].value.to],
                    min: response.data[2].value.min,
                    max: response.data[2].value.max
                })

                this.Flights.PriceInput = [this.state.min, this.state.max]

            }).catch((error) => {
                console.log(error)
            })
    }

    values() {


        // handling for empty searchinput
        if (this.sort != null) {
            console.log(this.sortDir)
            this.Flights.Sort = this.sort
            this.Flights.SortDir = this.sortDir;
            console.log(this.sortDir)

            $(".nav li").removeClass();
            $(".nav li span").removeClass();

            switch(this.sort) {

                case "price":
                document.getElementById(this.refs.priceArrowRef.id).className = "glyphicon glyphicon-arrow-up";
                document.getElementById(this.refs.priceLiRef.id).className = "active";
                if(this.sortDir === "DESC") {
                    document.getElementById(this.refs.priceArrowRef.id).className = "glyphicon glyphicon-arrow-down";
                }
                break;

                case "distance":
                document.getElementById(this.refs.distArrowRef.id).className = "glyphicon glyphicon-arrow-up";
                document.getElementById(this.refs.distLiRef.id).className = "active";
                if(this.sortDir === "DESC") {
                    document.getElementById(this.refs.distArrowRef.id).className = "glyphicon glyphicon-arrow-down";
                }
                break;
                case "name":
                document.getElementById(this.refs.nameArrowRef.id).className = "glyphicon glyphicon-arrow-up";
                document.getElementById(this.refs.nameLiRef.id).className = "active";
                if(this.sortDir === "DESC") {
                    document.getElementById(this.refs.nameArrowRef.id).className = "glyphicon glyphicon-arrow-down";
                }
                break;
                case "rating":
                document.getElementById(this.refs.ratingArrowRef.id).className = "glyphicon glyphicon-arrow-up";
                document.getElementById(this.refs.ratingLiRef.id).className = "active";
                if(this.sortDir === "DESC") {
                    document.getElementById(this.refs.ratingArrowRef.id).className = "glyphicon glyphicon-arrow-down";
                }
                break;

                default:
                return null;
            }
     
        }

        // handling for empty searchinput
        if (this.h != null) {
            this.Flights.searchInput = this.h
            this.refs.searchInput.value = this.h
        }

        // handling for empty priceinput
        if (this.p != null) {
            this.p = this.p.split('-');
            this.Flights.PriceInput = this.p;
            this.setState({
                values: this.p
            })

            resetButtonPriceFlg = true;
        }

        if (this.s != null) {

            //starinput value converting to array to filter from starRating
            // handling the selected check value
            this.s = this.s.split(',')
            this.Flights.ratingInput = this.s;
            this.setState({
                filterStar: this.state.filterStar.map(d => {
                    d.selected = false
                    // eslint-disable-next-line
                    this.s.map(star => {
                        if (star === d.code)
                            d.selected = true

                    })
                    return d
                })
            })

        }

        if (this.d != null) {
            // starinput value converting to array to filter from starRating
            // handling the selected check value
            this.d = this.d.split(',')
            this.Flights.districtInput = this.d;

            this.setState({
                filterDist: this.state.filterDist.map(d2 => {
                    d2.selected = false
                    // eslint-disable-next-line
                    this.d.map(dist => {

                        // eslint-disable-next-line
                        if (d2.code == dist) {
                            d2.selected = true
                        }
                    })
                    return d2;
                })
            })
        }

        if (this.c != null) {
            //cstarinput value converting to array to filter from starRating
            // handling the selected check value
            this.c = this.c.split(',')
            this.Flights.chainInput = this.c;

            this.setState({
                filterChain: this.state.filterChain.map(d2 => {
                    d2.selected = false
                    // eslint-disable-next-line
                    this.c.map(chain => {

                        // eslint-disable-next-line
                        if (d2.code == chain) {
                            d2.selected = true
                        }
                    })
                    return d2;
                })
            })
        }


        if (this.pa != null) {
            // starinput value converting to array to filter from starRating
            // handling the selected check value
            this.pa = this.pa.split(',')
            this.Flights.PAInput = this.pa;

            this.setState({
                filterPA: this.state.filterPA.map(d2 => {
                    d2.selected = false
                    // eslint-disable-next-line
                    this.pa.map(PA => {

                        // eslint-disable-next-line
                        if (d2.code == PA) {
                            d2.selected = true
                        }
                    })
                    return d2;
                })
            })

        }

        if (this.ra != null) {
            // starinput value converting to array to filter from starRating
            // handling the selected check value
            this.ra = this.ra.split(',')
            this.Flights.RAInput = this.ra;

            this.setState({
                filterRA: this.state.filterRA.map(d2 => {
                    d2.selected = false
                    // eslint-disable-next-line
                    this.ra.map(RA => {

                        // eslint-disable-next-line
                        if (d2.code == RA) {
                            d2.selected = true
                        }
                    })
                    return d2;
                })
            })

        }
    }

    //Sorting Functionality
    OnSort(LI, Anchor, Span) {
        this.Flights.Sort = Anchor
        let query;

        switch (document.getElementById(Span).className) {

            //DOWN Arrow Handling
            case "glyphicon glyphicon-arrow-down":
                $(".nav li").removeClass();
                $(".nav li span").removeClass();
                document.getElementById(Span).className = "glyphicon glyphicon-arrow-up";
                document.getElementById(LI).className = "active";
                this.Flights.SortDir = null
                break;

            //UP Arrow Handling
            case "glyphicon glyphicon-arrow-up":
                $(".nav li").removeClass();
                $(".nav li span").removeClass();
                document.getElementById(Span).className = "glyphicon glyphicon-arrow-down";
                document.getElementById(LI).className = "active";
                this.Flights.SortDir = 'DESC';
                break;

            //when diffrent sort button clicked
            default:
                $(".nav li").removeClass();
                $(".nav li span").removeClass();

                document.getElementById(Span).className = "glyphicon glyphicon-arrow-up";
                document.getElementById(LI).className = "active";
                this.Flights.SortDir = null
        }

        if (this.Flights.SortDir === 'DESC') {
            queries.sortDir = this.Flights.SortDir;
        }
        else {
            delete queries["sortDir"]
        }

        queries.sort = Anchor
        query = queryString.stringify(queries)
        query = query.replace(/%2C/g, ",")
        this.props.history.push({
            pathname: '/flight-search',
            search: query
        })

    }
    // Sorting Ends

    //Handler for Pice Range
    handlePageChange = (pageNumber) => {

        this.setState({ activePage: pageNumber });

        window.scrollTo(-4, -5);

    }


    // hotelName handel event
    handleSearchClick() {
        let query

        this.Flights.searchInput = this.refs.searchInput.value


        if (this.refs.searchInput.value.length === 0) {
            delete queries['h']

            query = queryString.stringify(queries)
            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        }
        else {

            queries.h = this.refs.searchInput.value

            query = queryString.stringify(queries)
            query = query.replace(/%2C/g, ",")

            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        }
    }


    // starRating handel event
    handleStarCheck(starObj, key) {
        let query;
        resetButtonStrFlg = true;

        var a = this.state.filterStar
        a[key].selected = !a[key].selected

        this.setState({
            filterStar: a
        })

        //Conditon to push data to Appstate
        this.Flights.ratingInput = []
        this.state.filterStar.forEach(d => {
            if (d.selected === true) {
                this.Flights.ratingInput.push(d.code);

            }
        })

        //condition for querystring
        if (this.Flights.ratingInput.length === this.state.filterStar.length || this.Flights.ratingInput.length === 0) {
            queries = _.omit(queries, 's')
            query = queryString.stringify(queries)
            query = query.replace(/%2C/g, ",")

            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        }

        else {

            queries.s = this.Flights.ratingInput;
            query = queryString.stringify(queries)
            query = query.replace(/%2C/g, ",")


            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })

        }
    }

    // District handel event
    handleDistCheck(code, key) {

        let query;
        resetButtonDistFlg = true;
        var a = this.state.filterDist
        a[key].selected = !a[key].selected

        this.setState({
            filterDist: a
        })

        //Conditon to push data to Appstate
        this.Flights.districtInput = []
        this.state.filterDist.forEach(d => {
            if (d.selected === true) {
                return this.Flights.districtInput.push(d.code);
            }
        })

        //condition for querystring
        if (this.Flights.districtInput.length === this.state.filterDist.length || this.Flights.districtInput.length === 0) {
            queries = _.omit(queries, 'd')
            query = queryString.stringify(queries)
            query = query.replace(/%2C/g, ",")

            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        }

        else {

            queries.d = this.Flights.districtInput;
            query = queryString.stringify(queries)
            query = query.replace(/%2C/g, ",")
            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        }
    }

    // Chain handel event
    handleChainCheck(code, key) {
        let query;
        resetButtonChainFlg = true;

        var a = this.state.filterChain
        a[key].selected = !a[key].selected

        this.setState({
            filterChain: a
        })

        //Conditon to push data to Appstate
        this.Flights.chainInput = []
        this.state.filterChain.forEach(d => {
            if (d.selected === true) {
                return this.Flights.chainInput.push(d.code);
            }
        })

        //condition for querystring
        if (this.Flights.chainInput.length === this.state.filterChain.length || this.Flights.chainInput.length === 0) {
            queries = _.omit(queries, 'c')
            query = queryString.stringify(queries)
            query = query.replace(/%2C/g, ",")

            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        }

        else {

            queries.c = this.Flights.chainInput;
            query = queryString.stringify(queries)
            query = query.replace(/%2C/g, ",")

            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })

        }
    }

    // Prop Amnities handle event
    handlePACheck(code, key) {
        let query;
        resetButtonPAFlg = true

        var a = this.state.filterPA
        a[key].selected = !a[key].selected

        this.setState({
            filterPA: a
        })

        //Conditon to push data to Appstate
        this.Flights.PAInput = []
        this.state.filterPA.forEach(d => {
            if (d.selected === true) {
                return this.Flights.PAInput.push(d.code);
            }
        })


        // condition for querystring
        if (this.Flights.PAInput.length === this.state.filterPA.length || this.Flights.PAInput.length === 0) {
            queries = _.omit(queries, 'pa')
            query = queryString.stringify(queries)
            query = query.replace(/%2C/g, ",")

            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        }

        else {

            queries.pa = this.Flights.PAInput;
            query = queryString.stringify(queries)
            query = query.replace(/%2C/g, ",")
            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })

        }


    }

    // Room Amnities handel event
    handleRACheck(code, key) {
        let query;
        resetButtonRAFlg = true;

        var a = this.state.filterRA
        a[key].selected = !a[key].selected

        this.setState({
            filterRA: a
        })

        //Conditon to push data to Appstate
        this.Flights.RAInput = []
        this.state.filterRA.forEach(d => {
            if (d.selected === true) {
                return this.Flights.RAInput.push(d.code);
            }
        })

        //condition for querystring
        if (this.Flights.RAInput.length === this.state.filterRA.length || this.Flights.RAInput.length === 0) {
            queries = _.omit(queries, 'ra')
            query = queryString.stringify(queries)
            query = query.replace(/%2C/g, ",")

            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        }

        else {

            queries.ra = this.Flights.RAInput;
            query = queryString.stringify(queries)
            query = query.replace(/%2C/g, ",")

            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })

        }
    }

    //Div hide and sholw
    handleDivHide(e) {

        var x = document.getElementById(e);

        if (x.style.display === "none") {
            x.style.display = "block";

        } else {
            x.style.display = "none";
        }
    }

    // Rheostate functionalities Price ranger handler
    updatePriceRanger(sliderState) {
        resetButtonPriceFlg = true;
        let query;
        _.remove(this.Flights.PriceInput)

        this.setState({
            values: sliderState.values,
        });

        _.forEach(sliderState.values, (d) => {
            this.Flights.PriceInput.push(d)
        })

        //condition for querystring
        if (this.Flights.PriceInput[0] === this.state.min && this.Flights.PriceInput[1] === this.state.max) {
            queries = _.omit(queries, 'p')
            query = queryString.stringify(queries)
            query = query.replace(/%2C/g, ",")

            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        }

        else {
            queries.p = JSON.stringify(this.Flights.PriceInput);
            queries.p = queries.p.replace(",", "-").replace("[", "").replace("]", "")
            query = queryString.stringify(queries)
            query = query.replace(/%2C/g, ",")

            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })


        }

    }
    // Rheostate ends

    handleOnly(value, filter, Input, resetBtnref, queriesKey) {

        if (Input.length == 1 || Input.length == 0) {
            switch (resetBtnref) {

                case "starRating":
                    this.state.filterStar.forEach(d => {
                        this.Flights.ratingInput.push(d.code);

                    })

                    break;
                case "dist":
                    this.state.hotel_data.forEach(d => {

                        this.Flights.districtInput.push(d.meta.districtId);
                    });
                    break;
                case "chain":
                    this.state.hotel_data.forEach(d => {

                        this.Flights.chainInput.push(d.meta.chainId);
                    });
                    break;
                case "PA":
                    this.state.hotel_data.forEach(d => {

                        d.meta.amenities.propertyAmenity.forEach(d2 => {
                            this.Flights.PAInput.push(d2.code)
                        })
                    });
                    break;
                case "RA":
                    this.state.hotel_data.forEach(d => {



                        d.meta.amenities.roomAmenity.forEach(d2 => {
                            this.Flights.RAInput.push(d2.code)
                        })
                    });
                    break;
                default:
                    console.log("No refs")
            }

        }
        switch (resetBtnref) {
            case "starRating":
                resetButtonStrFlg = true;
                break;
            case "dist":
                resetButtonDistFlg = true;
                break;
            case "chain":
                resetButtonChainFlg = true;
                break;
            case "PA":
                resetButtonPAFlg = true;
                break;
            case "RA":
                resetButtonRAFlg = true;
                break;
            default:
                console.log("No refs")
        }
        let query;
        this.setState({
            filter: _.forEach(filter, d => {
                d.selected = false;
                if (d.code === value.code) {
                    d.selected = true
                }

                if (d.selected === false) {
                    _.pull(Input, d.code, null, 0);

                }
            })
        })

        queries[queriesKey] = Input;
        queries[queriesKey] = _.uniq(Input)
        query = queryString.stringify(queries)
        query = query.replace(/%2C/g, ",")
        this.props.history.push({
            pathname: '/flight-search',
            search: query
        })

    }


    //filter Reset 
    handleReset(filterData, filterInput, btnRef, queriesKey) {
        let query;
        if (btnRef === "Price") {

            this.Flights.PriceInput = [this.state.min, this.state.max]

            this.setState({
                values: [this.state.min, this.state.max]
            })
            resetButtonPriceFlg = false

            delete queries[queriesKey]

            query = queryString.stringify(queries)
            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        }
        else {
            this.setState({
                filter: _.forEach(filterData, d => {
                    d.selected = true;
                })
            })
        }
        switch (btnRef) {

            case "starRating":
                this.state.filterStar.forEach(d => {
                    this.Flights.ratingInput.push(d.code);

                })
                resetButtonStrFlg = false;

                delete queries[queriesKey]


                query = queryString.stringify(queries)
                query = query.replace(/%2C/g, ",")
                this.props.history.push({
                    pathname: '/flight-search',
                    search: query
                })
                break;
            case "dist":
                this.state.hotel_data.forEach(d => {

                    this.Flights.districtInput.push(d.meta.districtId);
                });
                resetButtonDistFlg = false;
                delete queries[queriesKey]

                query = queryString.stringify(queries)
                query = query.replace(/%2C/g, ",")
                this.props.history.push({
                    pathname: '/flight-search',
                    search: query
                })
                break;
            case "chain":
                this.state.hotel_data.forEach(d => {

                    this.Flights.chainInput.push(d.meta.chainId);
                });
                resetButtonChainFlg = false;
                delete queries[queriesKey]

                query = queryString.stringify(queries)
                query = query.replace(/%2C/g, ",")
                this.props.history.push({
                    pathname: '/flight-search',
                    search: query
                })
                break;
            case "PA":
                this.state.hotel_data.forEach(d => {

                    d.meta.amenities.propertyAmenity.forEach(d2 => {
                        this.Flights.PAInput.push(d2.code)
                    })
                });
                resetButtonPAFlg = false;
                delete queries[queriesKey]

                query = queryString.stringify(queries)
                query = query.replace(/%2C/g, ",")
                this.props.history.push({
                    pathname: '/flight-search',
                    search: query
                })
                break;
            case "RA":
                this.state.hotel_data.forEach(d => {
                    d.meta.amenities.roomAmenity.forEach(d2 => {
                        this.Flights.RAInput.push(d2.code)
                    })
                });

                resetButtonRAFlg = false;
                delete queries[queriesKey]

                query = queryString.stringify(queries)
                query = query.replace(/%2C/g, ",")
                this.props.history.push({
                    pathname: '/flight-search',
                    search: query
                })
                break;
            default:
                console.log("No refs")
        }
    }



    render() {

        indexOfLastHotel = this.state.activePage * this.state.itemsCountPerPage;
        indexOfFirstHotel = indexOfLastHotel - this.state.itemsCountPerPage;
        currentHotels = _.slice(this.Flights.SearchFilter, indexOfFirstHotel, indexOfLastHotel);

        return (
            <div>

                <div className="container">
                    <h2>Select Hotel</h2>

                    <div className="row">

                        <div className="col-md-3">
                            <h3>Filter</h3>
                            <form className="col-sm-12 col-md-12" role="search">
                                <div className="form-group input-group">
                                    <input type="text" className="form-control" placeholder="Search hotel name..." ref="searchInput" />
                                    <span className="input-group-btn">
                                        <button className="btn btn-primary" type="button" onClick={() => { this.handleSearchClick(this.refs.searchInput.value) }} ref="searchBtn" id="searchID">
                                            <span className="glyphicon glyphicon-search"></span>
                                        </button>
                                    </span>
                                </div>
                            </form>


                            <div>
                                <h4>Price <span>{resetButtonPrice = resetButtonPriceFlg ? <button ref="priceR" name="Price" className="btn btn-primary" style={{ height: "20px", width: "40px", padding: "0px 0px" }}
                                    onClick={() => this.handleReset(this.state.filterPrice, this.Flights.PAInput, this.refs.priceR.name, "p")}>reset</button> : null}</span><span><button className="btn btn-default" onClick={() => this.handleDivHide(this.refs.price.id)}>^</button></span></h4>
                            </div>
                            <div id="Price" ref="price">

                                <form className="form">
                                    <Rheostat
                                        min={this.state.min}
                                        max={this.state.max}
                                        onValuesUpdated={(sliderState) => this.updatePriceRanger(sliderState)}

                                        values={this.state.values}

                                    />

                                    <span>SAR {Math.round(this.state.values[0])}</span> <span>SAR {Math.round(this.state.values[1])}</span>
                                </form>



                            </div>
                            <div>
                                <h4>Star Rating <span>{resetButtonStr = resetButtonStrFlg ? <button ref="starR" name="starRating" className="btn btn-primary" style={{ height: "20px", width: "40px", padding: "0px 0px" }}
                                    onClick={() => this.handleReset(this.state.filterStar, this.Flights.ratingInput, this.refs.starR.name, "s")}>reset</button> : null}</span> <span><button className="btn btn-default hide-btn" onClick={() => this.handleDivHide(this.refs.star.id)}>^</button></span></h4>
                            </div>
                            <div id="StarRating" ref="star">

                                {this.state.filterStar.map((v, key) => {


                                    return (
                                        <div key={key}>
                                            <label>
                                                <input type="checkbox" checked={v.selected} ref="starRef"
                                                    onClick={() => this.handleStarCheck({ code: v.code, selected: v.selected }, key)} name="starRating" />

                                            </label>
                                            <label>
                                                <Rater total={5} rating={v.code} interactive={false} />

                                            </label>
                                            <a onClick={() => { this.handleOnly(v, this.state.filterStar, this.Flights.ratingInput, this.refs.starRef.name, "s") }}> only </a>
                                        </div>)
                                })}

                            </div>

                            <hr />
                            <div>
                                <h4>District <span>{resetButtonDist = resetButtonDistFlg ? <button ref="distRes" name="dist" className="btn btn-primary" style={{ height: "20px", width: "40px", padding: "0px 0px" }}
                                    onClick={() => this.handleReset(this.state.filterDist, this.Flights.districtInput, this.refs.distRes.name, "d")}>reset</button> : null}</span><span><button className="btn btn-default hide-btn" onClick={() => this.handleDivHide(this.refs.dist.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="District" ref="dist">

                                {this.state.filterDist.map((v, key) => {
                                    return (
                                        <div key={key}>
                                            <label>
                                                <input type="checkbox" checked={v.selected} ref="distRef"
                                                    onClick={() => this.handleDistCheck(v.code, key)} name="dist" />

                                            </label>
                                            <label>
                                                <p>{v.label}</p>

                                            </label>
                                            <a onClick={() => { this.handleOnly(v, this.state.filterDist, this.Flights.districtInput, this.refs.distRef.name, "d") }}> only </a>
                                        </div>)
                                })}

                            </div>
                            <hr />
                            <div>
                                <h4>Chain     <span>{resetButtonChain = resetButtonChainFlg ? <button className="btn btn-primary" ref="chainRes" name="chain" style={{ height: "20px", width: "40px", padding: "0px 0px" }}
                                    onClick={() => this.handleReset(this.state.filterChain, this.Flights.chainInput, this.refs.chainRes.name, "c")}>reset</button> : null}</span> <span><button className="btn btn-default hide-btn" onClick={() => this.handleDivHide(this.refs.chain.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="Chain" ref="chain">


                                {this.state.filterChain.map((v, key) => {
                                    return (
                                        <div key={key}>
                                            <label>
                                                <input type="checkbox" checked={v.selected} ref="chainRef"
                                                    onClick={() => this.handleChainCheck(v.code, key)} name="chain" />
                                            </label>
                                            <label>
                                                <p>{v.label}</p>
                                            </label>
                                            <a onClick={() => { this.handleOnly(v, this.state.filterChain, this.Flights.chainInput, this.refs.chainRef.name, "c") }}> only </a>
                                        </div>)
                                })}

                            </div>
                            <hr />
                            <div>
                                <h4>Property Amenities <span>{resetButtonPA = resetButtonPAFlg ? <button ref="PARes" name="PA" className="btn btn-primary" style={{ height: "20px", width: "40px", padding: "0px 0px" }}
                                    onClick={() => this.handleReset(this.state.filterPA, this.Flights.PAInput, this.refs.PARes.name, "pa")}>reset</button> : null}</span><span><button className="btn btn-default hide-btn" onClick={() => this.handleDivHide(this.refs.pa.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="PropertyAmenities" ref="pa">



                                {this.state.filterPA.map((v, key) => {
                                    return (
                                        <div key={key}>
                                            <label>
                                                <input type="checkbox" value="asdasd" checked={v.selected} ref="paRef"
                                                    onClick={() => this.handlePACheck(v.code, key)} name="PA" />
                                            </label>
                                            <label>
                                                <p>{v.label}</p>
                                            </label>
                                            <a onClick={() => { this.handleOnly(v, this.state.filterPA, this.Flights.PAInput, this.refs.paRef.name, "pa") }}> only </a>
                                        </div>)
                                })}

                            </div>
                            <hr />
                            <div>
                                <h4>Room Amenities <span>{resetButtonRA = resetButtonRAFlg ? <button ref="RARes" name="RA" className="btn btn-primary" style={{ height: "20px", width: "40px", padding: "0px 0px" }}
                                    onClick={() => this.handleReset(this.state.filterRA, this.Flights.RAInput, this.refs.RARes.name, "ra")}>reset</button> : null}</span><span><button className="btn btn-default hide-btn" onClick={() => this.handleDivHide(this.refs.ra.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="RoomAmenities" ref="ra">



                                {this.state.filterRA.map((v, key) => {
                                    return (
                                        <div key={key}>
                                            <label>
                                                <input type="checkbox" checked={v.selected} ref="raRef"
                                                    onClick={() => this.handleRACheck(v.code, key)} name="RA" />
                                            </label>
                                            <label>
                                                <p>{v.label}</p>
                                            </label>
                                            <a onClick={() => { this.handleOnly(v, this.state.filterRA, this.Flights.RAInput, this.refs.raRef.name, "ra") }}> only </a>
                                        </div>)
                                })}

                            </div>
                        </div>

                        <div className="col-md-9">
                            <ul className="nav nav-pills" ref="ul">
                                <li id="popularLi" ref="popularLiRef" className="active"><a onClick={() => this.OnSort(this.refs.popularLiRef.id, this.refs.popularAnchor.id, this.refs.popularArrowRef.id)} id="popular" ref="popularAnchor" >Popular <span id="popularArrow" ref="popularArrowRef" className="glyphicon glyphicon-arrow-up" ></span></a></li>
                                <li id="priceLi" ref="priceLiRef"><a onClick={() => this.OnSort(this.refs.priceLiRef.id, this.refs.priceAnchor.id, this.refs.priceArrowRef.id)} id="price" ref="priceAnchor" >Price <span id="priceArrow" ref="priceArrowRef" ></span></a></li>
                                <li id="distLi" ref="distLiRef" ><a onClick={() => this.OnSort(this.refs.distLiRef.id, this.refs.distAnchor.id, this.refs.distArrowRef.id)} id="distance" ref="distAnchor"  >Distance <span id="distArrow" ref="distArrowRef"></span></a></li>
                                <li id="nameLi" ref="nameLiRef"><a onClick={() => this.OnSort(this.refs.nameLiRef.id, this.refs.nameAnchor.id, this.refs.nameArrowRef.id)} id="name" ref="nameAnchor"  >Name <span id="nameArrow" ref="nameArrowRef"></span></a></li>
                                <li id="ratingLi" ref="ratingLiRef"> <a onClick={() => this.OnSort(this.refs.ratingLiRef.id, this.refs.ratingAnchor.id, this.refs.ratingArrowRef.id)} id="rating" ref="ratingAnchor"  >Rating <span id="ratingArrow" ref="ratingArrowRef" ></span></a></li>
                                <span className="properties"> {this.Flights.SearchFilter.length} properties found </span>
                            </ul>

                            {
                                currentHotels.length === 0 ?

                                    <div>
                                        <strong className="hotelerror">(;-;)</strong> <br />
                                        No hotels available for your search!
                              </div> :
                                    currentHotels.map((data, key) => {

                                        return (


                                            <div className="col-sm-6 col-md-6" key={key}>
                                                <div className="thumbnail" >
                                                    <div className="img-div">
                                                        <img src={data.image.map(img => { return img.url; })} className="img-responsive" alt="Tajawal images" />
                                                    </div>
                                                    <div className="caption">
                                                        <Rater total={5} rating={data.rating.map(rating => { return rating.value })} interactive={false} />
                                                        <div className="row">
                                                            <div className="col-md-6 col-xs-6 hotelName-div">
                                                                <h4>{data.summary.hotelName}</h4>
                                                            </div>
                                                            <div className="col-md-6 col-xs-6 price">

                                                            </div>
                                                        </div>
                                                        <div className="address-div">
                                                            <p>{data.location.address}</p>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <h3> <label>{Math.floor(data.summary.lowRate)}</label> SAR</h3>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <a className="btn btn-warning btn-product"> Select</a></div>
                                                        </div>

                                                        <p> </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )

                                    })}
                        </div>
                    </div>
                </div>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.Flights.SearchFilter.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
            </div>
        )
    }
}
export default Flights;