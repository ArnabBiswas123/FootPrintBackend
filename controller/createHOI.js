const HOI = require("../modals/HealthOngoingIndividual");
const HealthOngoingIndividualValidate = require("../controller/HealthOngoingIndividualValidate");
const createHOI = async (req, res) => {
  try {
    try {
      await HealthOngoingIndividualValidate.validateAsync(req.body);
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
//    console.log(req.user)





    let projectCode = 0;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const {
      illness_nature,
      photograph_benificary,
      name,
      present_earning_member,
      address,
      aadhar_no,
      gender,
      email,
      DOB,
      mobile,
      father,
      no_of_children,
      language,
      religion,
      caste,
      nature_illness,
      past_project_duration,
      more_details_about_health,
      present_situation_family,
      Govt_or_other_support,
      nature_of_support,
      previous_amount_received,
      previous_total_amount,
      present_health_total_expense,
      present_health_family_contribute,
      present_health_amount_requested,
      aadhar_img,
      request_letter_img,
      treatment_record_img,
      benificary_agree,
      project_coordinator_agree,
    amount_approved_project_coordinator

    } = req.body;
    const projectExists = await HOI.findOne({ aadhar_no });
    if (projectExists) {
      return res.json({ success: false, msg: "This aadhar number exists" });
    }
    const allHOI = await HOI.find({}, "project_code");
    // console.log(allHOI);
    if (allHOI.length === 0) {
      projectCode = `HI${currentYear}0`;
    } else {
      projectCode = `HI${currentYear}${
        parseInt(allHOI[allHOI.length - 1].project_code.slice(-1))+1
      }`;
    }
    await HOI.create({
      project_code: projectCode,
      applicant:req.user,
      reviewer:req.user.reviewer,
      illness_nature,
      photograph_benificary,
      name,
      email,
      present_earning_member,
      address,
      aadhar_no,
      gender,
      DOB,
      mobile,
      father,
      no_of_children,
      language,
      religion,
      caste,
      nature_illness,
      past_project_duration,
      more_details_about_health,
      present_situation_family,
      Govt_or_other_support,
      nature_of_support,
      previous_amount_received,
      previous_total_amount,
      present_health_total_expense,
      present_health_family_contribute,
      present_health_amount_requested,
      aadhar_img,
      request_letter_img,
      treatment_record_img,
      benificary_agree,
      project_coordinator_agree,
      amount_approved_project_coordinator,

    });
    res.json({success:true});


  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};
module.exports = createHOI;
