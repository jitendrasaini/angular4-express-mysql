"use strict";
/**
 * Created by laurence-ho on 22/07/17.
 */
var express = require("express");
var router = express.Router();
var db = require('../database/db.service');
var authentication = require('../authentication');
// get one comment for edit
router.get('/comment/:comment_id/edit', authentication.checkCommentOwner, function (req, res) {
    db.getConnection(function (err, connection) {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {
            connection.query('SELECT * FROM comments WHERE id = ?', [req.params.comment_id], function (err, result) {
                connection.release();
                if (err) {
                    res.status(500).send({ message: err });
                }
                else {
                    res.status(200).send({ comment: result[0] });
                }
            });
        }
    });
});
// create a new comment by campground id
router.post('/comment', authentication.isLoggedIn, function (req, res) {
    req.body.text = req.sanitize(req.body.text);
    db.getConnection(function (err, connection) {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {
            connection.query('INSERT INTO comments SET ?', req.body, function (err, result) {
                connection.release();
                if (err) {
                    res.status(500).send({ message: err });
                }
                else {
                    res.status(200).send({ comment_id: result.insertId });
                }
            });
        }
    });
});
// edit one comment by comment id
router.put('/comment/:comment_id/edit', authentication.checkCommentOwner, function (req, res) {
    req.body.text = req.sanitize(req.body.text);
    db.getConnection(function (err, connection) {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {
            connection.query('UPDATE comments SET ? WHERE id = ?', [req.body, req.params.comment_id], function (err) {
                connection.release();
                if (err) {
                    res.status(500).send({ message: err });
                }
                else {
                    res.status(200).send({ comment_id: req.params.comment_id });
                }
            });
        }
    });
});
// delete one comment
router.delete('/comment/:comment_id', authentication.checkCommentOwner, function (req, res) {
    db.getConnection(function (err, connection) {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {
            connection.query('DELETE FROM comments WHERE id = ?', [req.params.comment_id], function (err) {
                connection.release();
                if (err) {
                    res.status(500).send({ message: err });
                }
                else {
                    res.status(200).send({ comment_id: req.params.comment_id });
                }
            });
        }
    });
});
module.exports = router;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxDQUFDO0FBRUgscUJBQXFCO0FBQ3JCLE1BQU0sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQUUsY0FBYyxDQUFDLGlCQUFpQixFQUFFLFVBQUMsR0FBUSxFQUFFLEdBQVE7SUFDMUYsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFDLEdBQVEsRUFBRSxVQUFlO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLFVBQVUsQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQUMsR0FBUTtnQkFDdkYsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUVyQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNULEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO2dCQUMzRCxDQUFDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO0lBQ0YsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUVILGlCQUFTLE1BQU0sQ0FBQyIsImZpbGUiOiJyb3V0ZXMvY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxhdXJlbmNlLWhvIG9uIDIyLzA3LzE3LlxyXG4gKi9cclxuXHJcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxuY29uc3QgZGIgPSByZXF1aXJlKCcuLi9kYXRhYmFzZS9kYi5zZXJ2aWNlJyk7XHJcbmNvbnN0IGF1dGhlbnRpY2F0aW9uID0gcmVxdWlyZSgnLi4vYXV0aGVudGljYXRpb24nKTtcclxuXHJcbi8vIGdldCBvbmUgY29tbWVudCBmb3IgZWRpdFxyXG5yb3V0ZXIuZ2V0KCcvY29tbWVudC86Y29tbWVudF9pZC9lZGl0JywgYXV0aGVudGljYXRpb24uY2hlY2tDb21tZW50T3duZXIsIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcclxuXHRkYi5nZXRDb25uZWN0aW9uKChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSA9PiB7XHJcblx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdHJlcy5zdGF0dXMoNTAwKS5zZW5kKHttZXNzYWdlOiBlcnJ9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gY29tbWVudHMgV0hFUkUgaWQgPSA/JywgW3JlcS5wYXJhbXMuY29tbWVudF9pZF0sIChlcnI6IGFueSwgcmVzdWx0OiBhbnkpID0+IHtcclxuXHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcblx0XHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdFx0cmVzLnN0YXR1cyg1MDApLnNlbmQoe21lc3NhZ2U6IGVycn0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXMuc3RhdHVzKDIwMCkuc2VuZCh7Y29tbWVudDogcmVzdWx0WzBdfSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcblxyXG4vLyBjcmVhdGUgYSBuZXcgY29tbWVudCBieSBjYW1wZ3JvdW5kIGlkXHJcbnJvdXRlci5wb3N0KCcvY29tbWVudCcsIGF1dGhlbnRpY2F0aW9uLmlzTG9nZ2VkSW4sIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcclxuXHRyZXEuYm9keS50ZXh0ID0gcmVxLnNhbml0aXplKHJlcS5ib2R5LnRleHQpO1xyXG5cclxuXHRkYi5nZXRDb25uZWN0aW9uKChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSA9PiB7XHJcblx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdHJlcy5zdGF0dXMoNTAwKS5zZW5kKHttZXNzYWdlOiBlcnJ9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbm5lY3Rpb24ucXVlcnkoJ0lOU0VSVCBJTlRPIGNvbW1lbnRzIFNFVCA/JywgcmVxLmJvZHksIChlcnI6IGFueSwgcmVzdWx0OiBhbnkpID0+IHtcclxuXHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcblx0XHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdFx0cmVzLnN0YXR1cyg1MDApLnNlbmQoe21lc3NhZ2U6IGVycn0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXMuc3RhdHVzKDIwMCkuc2VuZCh7Y29tbWVudF9pZDogcmVzdWx0Lmluc2VydElkfSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcblxyXG4vLyBlZGl0IG9uZSBjb21tZW50IGJ5IGNvbW1lbnQgaWRcclxucm91dGVyLnB1dCgnL2NvbW1lbnQvOmNvbW1lbnRfaWQvZWRpdCcsIGF1dGhlbnRpY2F0aW9uLmNoZWNrQ29tbWVudE93bmVyLCAocmVxOiBhbnksIHJlczogYW55KSA9PiB7XHJcblx0cmVxLmJvZHkudGV4dCA9IHJlcS5zYW5pdGl6ZShyZXEuYm9keS50ZXh0KTtcclxuXHJcblx0ZGIuZ2V0Q29ubmVjdGlvbigoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkgPT4ge1xyXG5cdFx0aWYgKGVycikge1xyXG5cdFx0XHRyZXMuc3RhdHVzKDUwMCkuc2VuZCh7bWVzc2FnZTogZXJyfSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KCdVUERBVEUgY29tbWVudHMgU0VUID8gV0hFUkUgaWQgPSA/JywgW3JlcS5ib2R5LCByZXEucGFyYW1zLmNvbW1lbnRfaWRdLCAoZXJyOiBhbnkpID0+IHtcclxuXHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcblx0XHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdFx0cmVzLnN0YXR1cyg1MDApLnNlbmQoe21lc3NhZ2U6IGVycn0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXMuc3RhdHVzKDIwMCkuc2VuZCh7Y29tbWVudF9pZDogcmVxLnBhcmFtcy5jb21tZW50X2lkfSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcblxyXG4vLyBkZWxldGUgb25lIGNvbW1lbnRcclxucm91dGVyLmRlbGV0ZSgnL2NvbW1lbnQvOmNvbW1lbnRfaWQnLCBhdXRoZW50aWNhdGlvbi5jaGVja0NvbW1lbnRPd25lciwgKHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xyXG5cdGRiLmdldENvbm5lY3Rpb24oKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpID0+IHtcclxuXHRcdGlmIChlcnIpIHtcclxuXHRcdFx0cmVzLnN0YXR1cyg1MDApLnNlbmQoe21lc3NhZ2U6IGVycn0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29ubmVjdGlvbi5xdWVyeSgnREVMRVRFIEZST00gY29tbWVudHMgV0hFUkUgaWQgPSA/JywgW3JlcS5wYXJhbXMuY29tbWVudF9pZF0sIChlcnI6IGFueSkgPT4ge1xyXG5cdFx0XHRcdGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cclxuXHRcdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0XHRyZXMuc3RhdHVzKDUwMCkuc2VuZCh7bWVzc2FnZTogZXJyfSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJlcy5zdGF0dXMoMjAwKS5zZW5kKHtjb21tZW50X2lkOiByZXEucGFyYW1zLmNvbW1lbnRfaWR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTtcclxuXHJcbmV4cG9ydCA9IHJvdXRlcjtcclxuIl19
