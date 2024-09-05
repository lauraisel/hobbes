package hr.algebra.hobbes.service;

import hr.algebra.hobbes.enums.EmailTemplateNameEnum;
import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmail(String to,
                   String username,
                   EmailTemplateNameEnum emailTemplateName,
                   String confirmationUrl,
                   String activationToken,
                   String subject) throws MessagingException;
}
