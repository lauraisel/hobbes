package hr.algebra.hobbes.enums;

import lombok.Getter;

@Getter
public enum EmailTemplateNameEnum {

    ACTIVATE_ACCOUNT("activate_account")

    ;
    private final String name;

    EmailTemplateNameEnum(String name) {
        this.name = name;
    }
}
