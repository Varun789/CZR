const mailjet = require ('node-mailjet')
.connect('98ce085f6f92390adf7cab407e4db92b', 'bf21f632a2cb156e14f6de6bb768101c')
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "czmanagement20@gmail.com",
        "Name": "Cognizance_2020"
      },
      "To": [
        {
          "Email": "17ce049@charusat.edu.in",
          "Name": "Cognizance2020"
        }
      ],
      "Subject": "OTP",
      "HTMLPart": "Your OTP is <h2>4582</h2>",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })
