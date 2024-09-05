package hr.algebra.hobbes.service.impl;

import hr.algebra.hobbes.enums.EmailTemplateNameEnum;
import hr.algebra.hobbes.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

@Async
    public void sendEmail(
            String to,
            String username,
            EmailTemplateNameEnum emailTemplateName,
            String confirmationUrl,
            String activationToken,
            String subject
    ) throws MessagingException {
        String templateName;
        if (emailTemplateName == null){
            templateName = "confirm-email";
        } else {
            templateName = emailTemplateName.name();
        }
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,
                MimeMessageHelper.MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
        );
        Map<String, Object> properties = new HashMap<>();
        properties.put("username",username);
        properties.put("confirmationUrl",confirmationUrl);
        properties.put("activationToken",activationToken);

        Context context = new Context();
        context.setVariables(properties);

        mimeMessageHelper.setFrom("hobbes.theproject@gmail.com");
        mimeMessageHelper.setTo(InternetAddress.parse(to));
        mimeMessageHelper.setSubject(subject);

        String template = templateEngine.process(templateName, context);

        mimeMessageHelper.setText(template, true);

        mailSender.send(mimeMessage);

    }
}
