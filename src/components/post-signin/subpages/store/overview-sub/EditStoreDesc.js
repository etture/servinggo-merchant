import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../../../../../actions/index';

import CenterView from "../../../../layout_bulma/CenterView";

class EditStoreDesc extends Component {
    constructor(props) {
        super(props);

        this.myStore = props.stores.filter((store) => store.id === props.lastStoreId)[0];

        // Regex for finding URL of previous route
        const currentUrl = props.match.url;
        const pattern = /(.*?)\/editDesc/;
        this.previousRoute = pattern.exec(currentUrl)[1];

        const desc = this.myStore.description ? this.myStore.description : '';

        this.state = {
            desc
        };
        console.log('Constructor desc:', this.state.desc);
        console.log('Constructor history:', this.props.history);
    }

    onSubmit = (formProps) => {
        const {token} = this.props;
        console.log('submitted, formProps:', formProps);

        // Description unchanged, don't make axios.put call
        if (!formProps.description) {
            console.log('desc not changed!');
        } else {
            formProps = {
                ...formProps,
                id: this.myStore.id
            };
            console.log('to be submitted, formProps:', formProps);


            this.props.editStoreDesc(token, formProps, () => {
                // Go back to OverviewTab
                this.props.history.push(this.previousRoute);
            });
        }
    };

    onDescChange = (desc) => {
        this.setState({desc});
        console.log('Changed desc:', this.state.desc);
    };

    renderField = ({placeholder, label, desc, input}) => {
        console.log('renderField desc:', desc);
        return (
            <div className="field">
                <label className="label">{label}</label>
                <div className="control">
                    <textarea
                        {...input}
                        className="textarea"
                        placeholder={placeholder}
                        style={{resize: "none"}}
                        value={desc}
                    />
                </div>
            </div>
        );
    };

    render() {
        const {match, handleSubmit} = this.props;
        console.log('EditStoreDesc myStore.description:', this.state.desc);
        console.log('EditStoreDesc match:', match);

        return (
            <CenterView>
                <div className="column is-12">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Field
                            placeholder="매장 정보 입력"
                            label="매장 정보"
                            name="description"
                            autoComplete="none"
                            desc={this.state.desc}
                            onChange={(e) => this.onDescChange(e.target.value)}
                            component={this.renderField}
                        />
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-primary" type="submit">정보 수정</button>
                            </div>
                            <div className="control">
                                <Link to={this.previousRoute}>
                                    <button className="button is-text">뒤로 가기</button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </CenterView>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: {
            accessToken: state.auth.accessToken,
            refreshToken: state.auth.refreshToken
        },
        stores: state.store.stores,
        lastStoreId: state.store.lastStoreId
    };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({form: 'editStoreInfo'})
)(EditStoreDesc);
