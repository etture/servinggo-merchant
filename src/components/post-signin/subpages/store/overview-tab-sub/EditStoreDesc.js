import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {renderTextArea} from "../../../../layout_bulma/ReduxFields";
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../../../../../actions/index';

import CenterView from "../../../../layout_bulma/CenterView";

class EditStoreDesc extends Component {
    constructor(props) {
        super(props);

        this.myStore = props.stores.filter((store) => store.id === props.currentStoreId)[0];

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

    render() {
        const {handleSubmit} = this.props;

        return (
            <CenterView>
                <div className="column is-12">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Field
                            placeholder="매장 소개 입력"
                            label="매장 소개"
                            name="description"
                            autoComplete="none"
                            content={this.state.desc}
                            onChange={(e) => this.onDescChange(e.target.value)}
                            component={renderTextArea}
                        />
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-primary" type="submit">저장</button>
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
        currentStoreId: state.store.currentStoreId
    };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({form: 'editStoreDesc'})
)(EditStoreDesc);
