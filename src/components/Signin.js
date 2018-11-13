import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../actions/index';

import CenterView from './layout/CenterView';
import FieldCard from './layout/FieldCard';

class Signin extends Component {
    onSubmit = formProps => {
        this.props.signin(formProps, () => {
            this.props.history.push('/dashboard');
        });
    };

    renderField({placeholder, input, type}) {
        return (
            <div className="form-group">
                <input
                    className="form-control"
                    {...input}
                    type={type}
                    placeholder={placeholder}
                />
            </div>
        );
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <CenterView>
                <FieldCard>
                    <div className="card-body mx-3">
                        <h4 className="card-title text-center mb-3">서빙고 대시보드에 로그인</h4>
                        <form onSubmit={handleSubmit(this.onSubmit)}>
                            <Field
                                placeholder="이메일 주소"
                                name="email"
                                type="email"
                                component={this.renderField}
                                autoComplete="none"
                            />
                            <Field
                                placeholder="비밀번호"
                                name="password"
                                type="password"
                                component={this.renderField}
                                autoComplete="none"
                            />
                            <button type="submit" className="btn btn-primary btn-block mt-4">로그인</button>
                        </form>
                    </div>
                    <div className="card-footer text-center">
                        서빙고 회원이 아니세요? <Link to="/signup" className="text">회원가입 하기</Link>
                    </div>
                </FieldCard>
            </CenterView>
        );
    }
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.errorMessage};
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({form: 'signin'})
)(Signin);