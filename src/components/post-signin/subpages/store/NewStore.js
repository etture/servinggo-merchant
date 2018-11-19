import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../../../../actions/index';

class NewStore extends Component {
    onSubmit = (formProps) => {
        console.log('onSubmit called');
        console.log('formProps:', formProps);

        const {accessToken} = this.props;

        this.props.createNewStore(accessToken, formProps, () => {
            this.props.history.push('/dashboard/stores');
            console.log('New store created successfully');
        });
    };

    renderField({placeholder, label, input, type}) {
        return (
            <div className="field">
                <label className="label">{label}</label>
                <div className="control">
                    <input
                        className="input"
                        type={type}
                        placeholder={placeholder}
                        {...input}
                    />
                </div>
            </div>
        );
    };

    render() {
        const {handleSubmit} = this.props;
        return (
            <div className="columns">
                <div className="column is-2"/>
                <div className="column">
                    <br/>
                    <div className="columns">
                        <div className="column is-6">
                            <form onSubmit={handleSubmit(this.onSubmit)}>
                                <Field
                                    placeholder="매장 이름"
                                    label="매장 이름"
                                    name="name"
                                    type="text"
                                    component={this.renderField}
                                    autoComplete="none"
                                />
                                <Field
                                    placeholder="매장 전화번호"
                                    label="매장 전화번호"
                                    name="phoneNum"
                                    type="number"
                                    component={this.renderField}
                                    autoComplete="none"
                                />
                                <Field
                                    placeholder="매장 주소"
                                    label="매장 주소"
                                    name="address"
                                    type="text"
                                    component={this.renderField}
                                    autoComplete="none"
                                />
                                <Field
                                    placeholder="매장 계좌번호"
                                    label="매장 계좌번호"
                                    name="accountNum"
                                    type="number"
                                    component={this.renderField}
                                    autoComplete="none"
                                />
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-link" type="submit">매장 등록</button>
                                    </div>
                                    <div className="control">
                                        <Link to="/dashboard/stores"><button className="button is-text">뒤로 가기</button></Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="column is-2"/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {accessToken: state.auth.accessToken};
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({form: 'newStore'})
)(NewStore);