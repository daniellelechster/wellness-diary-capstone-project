import React, { useState } from 'react';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
       
        console.log('Form submitted:', formData);
        
        
        setSubmitted(true);
        
       
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className="contact-container">
            <h2>CONTACT US</h2>
            
            <div className="contact-body">
                <div className="contact-info">
                    <h3>Get in Touch</h3>
                    <p>
                        Have questions about the Wellness Diary application? 
                        Want to provide feedback or report an issue? 
                        We'd love to hear from you!
                    </p>
                    <div className="contact-details">
                        <div className="contact-item">
                            <strong>Email:</strong> email@example.com
                        </div>
                        <div className="contact-item">
                            <strong>Team:</strong> CodeBusters
                        </div>
                        <div className="contact-item">
                            <strong>Response Time:</strong> Within 24-48 hours
                        </div>
                    </div>
                </div>

                <div className="contact-form-wrapper">
                    {submitted && (
                        <div className="success-message">
                            Thank you! Your message has been sent successfully.
                        </div>
                    )}
                    
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your full name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject *</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="What is this regarding?"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                placeholder="Tell us more..."
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;