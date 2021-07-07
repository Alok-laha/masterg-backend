
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../../database/database');
const Op = Sequelize.Op
const AppError = require('../../utils/appError');

// this router gives us all the entities from database
exports.getcmspageget = async (req, res, next) => {
    try {
        console.log(req.headers);
            if(req.body.aboutus != "" && req.body.aboutus != "0")
            //if(req.body.aboutus == '1')
            {
                const aboutus = await sequelize.query("SELECT * FROM `cmspage` WHERE `cmspageName` LIKE '%About Us%' AND `cmspageStatus` = 'Active'", { type: QueryTypes.SELECT });
        
                if(aboutus.length == 0)
                {
                    return next(new AppError('About Us Not Found', 400));
                }
                res.status(200).json({
                    status: true,
                    message: 'About Us given',
                    data: {
                        aboutus,
                    },
                });
            }
            else if (req.body.contactus != '' && req.body.contactus != '0') 
            //else if(req.body.contactus == "1")
            {
                const contactus = await sequelize.query("SELECT * FROM `cmspage` WHERE `cmspageName` LIKE '%Contact Us%' AND `cmspageStatus` = 'Active'", { type: QueryTypes.SELECT });
        
                if(contactus.length == 0)
                {
                    return next(new AppError('Contact Us Not Found', 400));
                }

                res.status(200).json({
                    status: true,
                    message: 'Contact Us given',
                    data: {contactus}
                
                });
            }
            else if(req.body.faqs != '' && req.body.faqs != '0') 
            //else if(req.body.faqs == '1')
            {
                const faqs = await sequelize.query("SELECT * FROM faq INNER JOIN faqtype ON faqtype.faqtypeID = faq.faqtypeID WHERE faq.faqStatus = 'Active'", { type: QueryTypes.SELECT });
                
                if(faqs.length == 0)
                {
                    return next(new AppError('Contact Us Not Found', 400));
                }
                res.status(200).json({
                    status: true,
                    message: 'FAQs given',
                    data: {
                        faqs,
                    },
                });
            }
            else if (req.body.privacypolicy != '' && req.body.privacypolicy != '0') 
            //else if(req.body.privacypolicy == '1')
            {
                const privacypolicy = await sequelize.query("SELECT * FROM `cmspage` WHERE `cmspageName` LIKE '%Privacy Policy%' AND `cmspageStatus` = 'Active'", { type: QueryTypes.SELECT });
        
                if(privacypolicy.length == 0)
                {
                    return next(new AppError('Privacy Policy Not Found', 400));
                }
                res.status(200).json({
                    status: true,
                    message: 'Privacy Policy given',
                    data: {
                        privacypolicy,
                    },
                });
            } 
            else if(req.body.termsconditions != '' && req.body.termsconditions != '0')
            //else if( req.body.termsconditions== '1')
            {
                const termsconditions = await sequelize.query("SELECT * FROM `cmspage` WHERE `cmspageName` LIKE '%Terms & Conditions%' AND `cmspageStatus` = 'Active'", { type: QueryTypes.SELECT });
        
                if(termsconditions.length == 0)
                {
                    return next(new AppError('Terms & Conditions Not Found', 400));
                }
                res.status(200).json({
                    status: true,
                    message: 'Terms & Conditions given',
                    data: {
                        termsconditions,
                    },
                });
            }
            else
            {
                return next(new AppError('Please enter the required parameters', 400));
            }
    } 
    catch (error) 
    {
        return next(error);
    }

}