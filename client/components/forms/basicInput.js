import React from 'react';

import FormService from '../../services/form';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Col, FormGroup, Label, InputGroup, InputGroupAddon, Input, FormFeedback} from 'reactstrap';

class BasicInput extends React.Component {
    constructor(props) {
        super(props);

        this.type = this.props.type;
        this.name = this.props.name;
        this.id = this.props.id ? this.props.id : null;
        this.class = this.props.class ? this.props.class : null;
        this.label = this.props.label ? this.props.label : null;
        this.placeholder = this.props.placeholder ? this.props.placeholder : null;
        this.value = this.props.value ? this.props.value : null;
        this.icon = this.props.icon ? this.props.icon : null;
        this.columns = this.props.columns ? this.props.columns : null;
        this.disabled = this.props.disabled ? this.props.disabled : null;
        this.errors = this.props.errors;
        this.formik = this.props.formik ? this.props.formik : undefined;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.class = nextProps.class;
            this.disabled = nextProps.disabled;
            this.errors = nextProps.errors;
            this.formik = nextProps.formik;
            this.value = nextProps.value;
        }
    }

    renderPlainInput() {
        return (
            <FormGroup>
                <Input
                    type={this.type}
                    name={this.name}
                    id={this.id ? this.id : this.name}
                    className={this.class && this.class}
                    placeholder={this.placeholder && this.placeholder}
                    value={this.value ? this.value :
                           this.formik ? this.formik.values[this.name] :
                           null
                    }
                    onChange={this.formik && FormService.customOnChange(this.formik.handleChange, this.errors)}
                    onBlur={this.formik ? (this.formik.submitCount > 0 ? null : this.formik.handleBlur) : null}
                    invalid={this.formik && FormService.invalidStatus(this.name, this.formik.touched, this.formik.errors, this.errors)}
                    disabled={this.disabled ? true : false}
                />
                <FormFeedback invalid="true">{this.formik && this.formik.touched[this.name] && FormService.compileErrors(this.name, this.formik.errors, this.errors)}</FormFeedback>
            </FormGroup>
        );
    }

    renderFormGroup() {
        return (
            <FormGroup className={this.class && this.class}>
                <Label for={this.name}>{this.label && this.label}</Label>
                <Input
                    type={this.type}
                    name={this.name}
                    id={this.id ? this.id : this.name}
                    placeholder={this.placeholder && this.placeholder}
                    value={this.value ? this.value :
                           this.formik ? this.formik.values[this.name] :
                           null
                    }
                    onChange={this.formik && FormService.customOnChange(this.formik.handleChange, this.errors)}
                    onBlur={this.formik ? (this.formik.submitCount > 0 ? null : this.formik.handleBlur) : null}
                    invalid={this.formik && FormService.invalidStatus(this.name, this.formik.touched, this.formik.errors, this.errors)}
                    disabled={this.disabled ? true : false}
                />
                <FormFeedback invalid="true">{this.formik && this.formik.touched[this.name] && FormService.compileErrors(this.name, this.formik.errors, this.errors)}</FormFeedback>
            </FormGroup>
        );
    }

    renderFormGroupRow() {
        return (
            <FormGroup className={this.class && this.class} row>
                <Label for={this.name} md={this.columns.label}>{this.label && this.label}</Label>
                <Col md={this.columns.input}>
                    <Input
                        type={this.type}
                        name={this.name}
                        id={this.id ? this.id : this.name}
                        placeholder={this.placeholder && this.placeholder}
                        value={this.value ? this.value :
                               this.formik ? this.formik.values[this.name] :
                               null
                        }
                        onChange={this.formik && FormService.customOnChange(this.formik.handleChange, this.errors)}
                        onBlur={this.formik ? (this.formik.submitCount > 0 ? null : this.formik.handleBlur) : null}
                        invalid={this.formik && FormService.invalidStatus(this.name, this.formik.touched, this.formik.errors, this.errors)}
                        disabled={this.disabled ? true : false}
                    />
                    <FormFeedback invalid="true">{this.formik && this.formik.touched[this.name] && FormService.compileErrors(this.name, this.formik.errors, this.errors)}</FormFeedback>
                </Col>
            </FormGroup>
        );
    }

    renderInputGroup() {
        return (
            <FormGroup>
                <InputGroup className={this.class && this.class}>
                    <InputGroupAddon addonType="prepend">
                        <FontAwesomeIcon icon={this.icon}/>
                    </InputGroupAddon>
                    <Input
                        type={this.type}
                        name={this.name}
                        id={this.id ? this.id : this.name}
                        placeholder={this.placeholder && this.placeholder}
                        value={this.value ? this.value :
                               this.formik ? this.formik.values[this.name] :
                               null
                        }
                        onChange={this.formik && FormService.customOnChange(this.formik.handleChange, this.errors)}
                        onBlur={this.formik ? (this.formik.submitCount > 0 ? null : this.formik.handleBlur) : null}
                        invalid={this.formik && FormService.invalidStatus(this.name, this.formik.touched, this.formik.errors, this.errors)}
                        disabled={this.disabled ? true : false}
                    />
                </InputGroup>
                <FormFeedback invalid="true">{this.formik && this.formik.touched[this.name] && FormService.compileErrors(this.name, this.formik.errors, this.errors)}</FormFeedback>
            </FormGroup>
        );
    }

    renderFormGroupWithInputGroup() {
        return (
            <FormGroup className={this.class && this.class}>
                <Label for={this.name}>{this.label && this.label}</Label>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <FontAwesomeIcon icon={this.icon}/>
                    </InputGroupAddon>
                    <Input
                        type={this.type}
                        name={this.name}
                        id={this.id ? this.id : this.name}
                        placeholder={this.placeholder && this.placeholder}
                        value={this.value ? this.value :
                               this.formik ? this.formik.values[this.name] :
                               null
                        }
                        onChange={this.formik && FormService.customOnChange(this.formik.handleChange, this.errors)}
                        onBlur={this.formik ? (this.formik.submitCount > 0 ? null : this.formik.handleBlur) : null}
                        invalid={this.formik && FormService.invalidStatus(this.name, this.formik.touched, this.formik.errors, this.errors)}
                        disabled={this.disabled ? true : false}
                    />
                </InputGroup>
                <FormFeedback invalid="true">{this.formik && this.formik.touched[this.name] && FormService.compileErrors(this.name, this.formik.errors, this.errors)}</FormFeedback>
            </FormGroup>
        );
    }

    renderFormGroupRowWithInputGroup() {
        return (
            <FormGroup className={this.class && this.class} row>
                <Label for={this.name} md={this.columns.label}>{this.label && this.label}</Label>
                <Col md={this.columns.input}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <FontAwesomeIcon icon={this.icon}/>
                        </InputGroupAddon>
                        <Input
                            type={this.type}
                            name={this.name}
                            id={this.id ? this.id : this.name}
                            placeholder={this.placeholder && this.placeholder}
                            value={this.value ? this.value :
                                   this.formik ? this.formik.values[this.name] :
                                   null
                            }
                            onChange={this.formik && FormService.customOnChange(this.formik.handleChange, this.errors)}
                            onBlur={this.formik ? (this.formik.submitCount > 0 ? null : this.formik.handleBlur) : null}
                            invalid={this.formik && FormService.invalidStatus(this.name, this.formik.touched, this.formik.errors, this.errors)}
                            disabled={this.disabled ? true : false}
                        />
                    </InputGroup>
                    <FormFeedback invalid="true">{this.formik && this.formik.touched[this.name] && FormService.compileErrors(this.name, this.formik.errors, this.errors)}</FormFeedback>
                </Col>
            </FormGroup>
        );
    }        

    render() {
        return (
            <React.Fragment>
                {this.columns && this.label && this.icon ? this.renderFormGroupRowWithInputGroup()
                : this.label && this.icon ? this.renderFormGroupWithInputGroup()
                : this.columns && this.label ? this.renderFormGroupRow()
                : this.icon ? this.renderInputGroup()
                : this.label ? this.renderFormGroup()
                : this.renderPlainInput()
                }
            </React.Fragment>
        );
    }
}

export default BasicInput;