import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../actions/index';
import Background from './layout/Background';
import CenterView from './layout/CenterView';
import Logo from './layout/Logo';
import FieldCard from './layout/FieldCard';


class Signup extends Component {
    onSubmit = (formProps) => {
        this.props.signup(formProps, () => {
            this.props.history.push('/dashboard');
        });
    }

    renderField({placeholder, label, input, type}) {
        return (
            <div className="form-group">
                <label>{label}</label>
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
            <Background>
                <CenterView>
                    <Logo/>
                    <FieldCard>
                        <div className="card-body mx-3">
                            <h4 className="card-title text-center text-gradient mb-3">서빙고 회원가입</h4>
                            <form onSubmit={handleSubmit(this.onSubmit)}>
                                <Field
                                    placeholder="이메일 주소 입력"
                                    label="이메일 주소"
                                    name="email"
                                    type="email"
                                    component={this.renderField}
                                    autoComplete="none"
                                />
                                <Field
                                    placeholder="비밀번호 입력"
                                    label="비밀번호"
                                    name="password"
                                    type="password"
                                    component={this.renderField}
                                    autoComplete="none"
                                />
                                <Field
                                    placeholder="이름 입력"
                                    label="이름"
                                    name="name"
                                    type="text"
                                    component={this.renderField}
                                    autoComplete="none"
                                />
                                <Field
                                    placeholder="휴대폰 번호 (- 빼고 숫자만 입력)"
                                    label="휴대폰 번호"
                                    name="phone_number"
                                    type="number"
                                    component={this.renderField}
                                    autoComplete="none"
                                />
                                <button type="submit" className="btn btn-primary btn-gradient btn-block mt-4">회원가입하기</button>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <Link to="/signin" className="text">뒤로 가기</Link>
                        </div>
                    </FieldCard>
                </CenterView>
            </Background>
        );
    }
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.errorMessage};
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({form: 'signup'})
)(Signup)