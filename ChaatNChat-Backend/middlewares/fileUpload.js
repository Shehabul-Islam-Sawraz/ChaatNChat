const multer = require('multer')
const fs = require('fs')
const path = require('path')

exports.userFile = ((req, res, next) => {

    const getFileType = (file) => {
        const mimeType = file.mimetype.split('/')
        return mimeType[mimeType.length - 1]
    }

    const generateFileName = (req, file, callback) => {
        const extension = getFileType(file)

        const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + extension
        callback(null, file.fieldname + '-' + fileName)
    }

    const fileFilter = (req, file, callback) => {
        const extension = getFileType(file)

        const allowedType = /jpeg|jpg|png/

        const passed = allowedType.test(extension)

        if (passed) {
            return callback(null, true)
        }

        return callback(null, false)
    }

    const storage = multer.diskStorage({
        destination: function (req, file, callback) {
            const { id } = req.user
            const dest = `uploads/user/${id}`

            fs.access(dest, (error) => {
                if (error) {
                    return fs.mkdir(dest, (error) => {
                        callback(error, dest)
                    })
                }
                else {
                    fs.readdir(dest, (error, files) => {
                        if (error) throw error

                        for (const file of files) {
                            fs.unlink(path.join(dest, file), error => {
                                if (error) throw error
                            })
                        }
                    })

                    return callback(null, dest)
                }
            })
        },
        filename: generateFileName
    })

    return multer({ storage, fileFilter }).single('avatar')
})()