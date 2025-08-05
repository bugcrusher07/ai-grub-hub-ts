// import { Request, Response, NextFunction } from 'express';
// import { IGuest,IUser } from './user';
// import { GuestUser ,User} from './user';
// // interface AuthenticatedRequest extends Request {
// //   user?: IUser;
// //   guest?: IGuest;
// // }
// // declare global {
// //   namespace Express {
// //     interface Request {
// //       user?: IUser;  // Your custom user type
// //       guestUser?: IGuest; // Your guest type
// //     }
// //   }
// // }

// export const checkTokens = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//   try {
//     // Check for authenticated user first
//     if (req.user) {
//       const user = await User.findById(req.user._id);
//       if (!user) {
//         return res.status(401).json({
//           success: false,
//           error: 'User not found',
//           errorType: 'USER_NOT_FOUND'
//         });
//       }

//       if (user.tokens <= 0) {
//         return res.status(403).json({
//           success: false,
//           error: 'Insufficient tokens. Please upgrade your plan or wait for token refresh.',
//           errorType: 'INSUFFICIENT_TOKENS',
//           remainingTokens: 0
//         });
//       }

//       // Attach the full user document to the request
//       req.user = user;
//       return next();
//     }

//     // Check for guest user
//     if (req.guest) {
//       const guest = await GuestUser.findOne({ uuid: req.guest.uuid });
//       if (!guest) {
//         return res.status(401).json({
//           success: false,
//           error: 'Guest session expired',
//           errorType: 'GUEST_SESSION_EXPIRED'
//         });
//       }

//       // Check if guest has tokens
//       if (guest.tokens <= 0) {
//         return res.status(403).json({
//           success: false,
//           error: 'Guest tokens exhausted. Please register for more access.',
//           errorType: 'GUEST_LIMIT_EXCEEDED',
//           remainingTokens: 0
//         });
//       }

//       // Update last active time
//       guest.lastActive = new Date();
//       await guest.save();

//       // Attach the guest document to the request
//       req.guest = guest;
//       return next();
//     }

//     // No user or guest found
//     return res.status(401).json({
//       success: false,
//       error: 'Please login or continue as guest to use this feature',
//       errorType: 'AUTH_REQUIRED'
//     });

//   } catch (error) {
//     console.error('Token check error:', error);
//     return res.status(500).json({
//       success: false,
//       error: 'Internal server error during token verification',
//       errorType: 'SERVER_ERROR'
//     });
//   }
// };

// export const deductToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//   try {
//     // Skip deduction if it's a preflight request
//     if (req.method === 'OPTIONS') {
//       return next();
//     }

//     if (req.user) {
//       // Deduct token for registered user
//       const updatedUser = await User.findByIdAndUpdate(
//         req.user._id,
//         { $inc: { tokens: -1 } },
//         { new: true }
//       );

//       if (!updatedUser) {
//         return res.status(500).json({
//           success: false,
//           error: 'Failed to update user tokens',
//           errorType: 'TOKEN_UPDATE_FAILED'
//         });
//       }

//       // Attach remaining tokens to response
//       res.locals.remainingTokens = updatedUser.tokens;
//     }
//     else if (req.guest) {
//       // Deduct token for guest
//       const updatedGuest = await GuestUser.findOneAndUpdate(
//         { uuid: req.guest.uuid },
//         { $inc: { tokens: -1 }, lastActive: new Date() },
//         { new: true }
//       );

//       if (!updatedGuest) {
//         return res.status(500).json({
//           success: false,
//           error: 'Failed to update guest tokens',
//           errorType: 'TOKEN_UPDATE_FAILED'
//         });
//       }

//       // Attach remaining tokens to response
//       res.locals.remainingTokens = updatedGuest.tokens;
//     }

//     next();
//   } catch (error) {
//     console.error('Token deduction error:', error);
//     return res.status(500).json({
//       success: false,
//       error: 'Internal server error during token deduction',
//       errorType: 'SERVER_ERROR'
//     });
//   }
// };
// // interface AuthenticatedRequest extends Request {
// //   user?: IUser;
// //   guest?: IGuest;
// // }

// // export const checkTokens = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
// //   try {
// //     // Check for authenticated user first
// //     if (req.user) {
// //       const user = await User.findById(req.user._id);
// //       if (!user) {
// //         return res.status(401).json({
// //           success: false,
// //           error: 'User not found'
// //         });
// //       }

// //       if (user.tokens <= 0) {
// //         return res.status(403).json({
// //           success: false,
// //           error: 'Insufficient tokens. Please upgrade your plan or wait for token refresh.',
// //           errorType: 'INSUFFICIENT_TOKENS'
// //         });
// //       }

// //       // Attach the user document to the request
// //       req.user = user;
// //       return next();
// //     }

// //     // Check for guest user
// //     if (req.guest) {
// //       const guest = await Guest.findOne({ uuid: req.guest.uuid });
// //       if (!guest) {
// //         return res.status(401).json({
// //           success: false,
// //           error: 'Guest session expired'
// //         });
// //       }

// //       // Check if guest has tokens and session is still valid (e.g., last active within 24 hours)
// //       const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

// //       if (guest.tokens <= 0 || (guest.lastActive && guest.lastActive < twentyFourHoursAgo)) {
// //         return res.status(403).json({
// //           success: false,
// //           error: 'Guest tokens exhausted or session expired. Please register for more access.',
// //           errorType: 'GUEST_LIMIT_EXCEEDED'
// //         });
// //       }

// //       // Update last active time
// //       guest.lastActive = new Date();
// //       await guest.save();

// //       // Attach the guest document to the request
// //       req.guest = guest;
// //       return next();
// //     }

// //     // No user or guest found
// //     return res.status(401).json({
// //       success: false,
// //       error: 'Please login or continue as guest to use this feature',
// //       errorType: 'AUTH_REQUIRED'
// //     });

// //   } catch (error) {
// //     console.error('Token check error:', error);
// //     return res.status(500).json({
// //       success: false,
// //       error: 'Internal server error during token verification'
// //     });
// //   }
// // };

// // export const deductToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
// //   try {
// //     if (req.user) {
// //       // Deduct token for registered user
// //       const updatedUser = await User.findByIdAndUpdate(
// //         req.user._id,
// //         { $inc: { tokens: -1 } },
// //         { new: true }
// //       );

// //       if (!updatedUser) {
// //         return res.status(500).json({
// //           success: false,
// //           error: 'Failed to update user tokens'
// //         });
// //       }
// //     }
// //     else if (req.guest) {
// //       // Deduct token for guest
// //       const updatedGuest = await Guest.findOneAndUpdate(
// //         { uuid: req.guest.uuid },
// //         { $inc: { tokens: -1 }, lastActive: new Date() },
// //         { new: true }
// //       );

// //       if (!updatedGuest) {
// //         return res.status(500).json({
// //           success: false,
// //           error: 'Failed to update guest tokens'
// //         });
// //       }
// //     }

// //     next();
// //   } catch (error) {
// //     console.error('Token deduction error:', error);
// //     return res.status(500).json({
// //       success: false,
// //       error: 'Internal server error during token deduction'
// //     });
// //   }
// // };