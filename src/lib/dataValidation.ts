// Validări pentru datele din aplicație
import { ALLOWED_FEATURES, ALLOWED_BRANDS, ALLOWED_CATEGORIES } from './validations';
import { triggerError } from './footerProtection';

// Funcție pentru a valida dotările motocicletelor
export const validateFeatures = (features: string[]): boolean => {
  if (!features || !Array.isArray(features)) {
    console.error('Eroare: features nu este un array valid');
    return false;
  }

  // Verificăm dacă toate dotările sunt în lista de dotări permise
  const isValid = features.every(feature => ALLOWED_FEATURES.includes(feature));
  
  if (!isValid) {
    console.error('Eroare: Una sau mai multe dotări nu sunt permise');
    triggerError('INVALID_FEATURES');
  }
  
  return isValid;
};

// Funcție pentru a valida marca motocicletei
export const validateBrand = (brand: string): boolean => {
  if (!brand || typeof brand !== 'string') {
    console.error('Eroare: brand nu este un string valid');
    return false;
  }

  // Verificăm dacă marca este în lista de mărci permise
  const isValid = ALLOWED_BRANDS.includes(brand);
  
  if (!isValid) {
    console.error('Eroare: Marca nu este permisă');
    triggerError('INVALID_BRAND');
  }
  
  return isValid;
};

// Funcție pentru a valida categoriile
export const validateCategory = (category: { name: string, image: string }): boolean => {
  if (!category || typeof category !== 'object') {
    console.error('Eroare: category nu este un obiect valid');
    return false;
  }

  if (!category.name || !category.image) {
    console.error('Eroare: category nu are proprietățile name și image');
    return false;
  }

  // Verificăm dacă categoria este în lista de categorii permise
  const isValid = ALLOWED_CATEGORIES.some(
    allowedCategory => 
      allowedCategory.name === category.name && 
      allowedCategory.image === category.image
  );
  
  if (!isValid) {
    console.error('Eroare: Categoria nu este permisă');
    triggerError('INVALID_CATEGORY');
  }
  
  return isValid;
};

// Funcție pentru a valida categoriile
export const validateCategories = (categories: { name: string, image: string }[]): boolean => {
  if (!categories || !Array.isArray(categories)) {
    console.error('Eroare: categories nu este un array valid');
    return false;
  }

  // Verificăm dacă toate categoriile sunt valide
  const isValid = categories.every(category => validateCategory(category));
  
  if (!isValid) {
    console.error('Eroare: Una sau mai multe categorii nu sunt permise');
    triggerError('INVALID_CATEGORIES');
  }
  
  return isValid;
};

// Funcție pentru a valida datele unui anunț
export const validateListing = (listing: any): boolean => {
  if (!listing || typeof listing !== 'object') {
    console.error('Eroare: listing nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['title', 'price', 'year', 'mileage', 'location', 'category', 'brand', 'model', 'engine_capacity'];
  const hasRequiredProps = requiredProps.every(prop => listing.hasOwnProperty(prop) && listing[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Anunțul nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_PROPS');
    return false;
  }

  // Validăm marca
  if (!validateBrand(listing.brand)) {
    return false;
  }

  // Validăm dotările dacă există
  if (listing.features && !validateFeatures(listing.features)) {
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui profil
export const validateProfile = (profile: any): boolean => {
  if (!profile || typeof profile !== 'object') {
    console.error('Eroare: profile nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'email'];
  const hasRequiredProps = requiredProps.every(prop => profile.hasOwnProperty(prop) && profile[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Profilul nu are toate proprietățile obligatorii');
    triggerError('INVALID_PROFILE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui utilizator
export const validateUser = (user: any): boolean => {
  if (!user || typeof user !== 'object') {
    console.error('Eroare: user nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['id', 'email'];
  const hasRequiredProps = requiredProps.every(prop => user.hasOwnProperty(prop) && user[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Utilizatorul nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui mesaj
export const validateMessage = (message: any): boolean => {
  if (!message || typeof message !== 'object') {
    console.error('Eroare: message nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['sender_id', 'receiver_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => message.hasOwnProperty(prop) && message[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Mesajul nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unei recenzii
export const validateReview = (review: any): boolean => {
  if (!review || typeof review !== 'object') {
    console.error('Eroare: review nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['reviewer_id', 'reviewed_id', 'rating', 'content'];
  const hasRequiredProps = requiredProps.every(prop => review.hasOwnProperty(prop) && review[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Recenzia nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_PROPS');
    return false;
  }

  // Verificăm dacă rating este între 1 și 5
  if (review.rating < 1 || review.rating > 5) {
    console.error('Eroare: Rating-ul trebuie să fie între 1 și 5');
    triggerError('INVALID_REVIEW_RATING');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui favorit
export const validateFavorite = (favorite: any): boolean => {
  if (!favorite || typeof favorite !== 'object') {
    console.error('Eroare: favorite nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'listing_id'];
  const hasRequiredProps = requiredProps.every(prop => favorite.hasOwnProperty(prop) && favorite[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Favoritul nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unei conversații
export const validateConversation = (conversation: any): boolean => {
  if (!conversation || typeof conversation !== 'object') {
    console.error('Eroare: conversation nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user1_id', 'user2_id'];
  const hasRequiredProps = requiredProps.every(prop => conversation.hasOwnProperty(prop) && conversation[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Conversația nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unei notificări
export const validateNotification = (notification: any): boolean => {
  if (!notification || typeof notification !== 'object') {
    console.error('Eroare: notification nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'type', 'content'];
  const hasRequiredProps = requiredProps.every(prop => notification.hasOwnProperty(prop) && notification[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Notificarea nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unei tranzacții
export const validateTransaction = (transaction: any): boolean => {
  if (!transaction || typeof transaction !== 'object') {
    console.error('Eroare: transaction nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'listing_id', 'amount', 'status'];
  const hasRequiredProps = requiredProps.every(prop => transaction.hasOwnProperty(prop) && transaction[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tranzacția nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui raport
export const validateReport = (report: any): boolean => {
  if (!report || typeof report !== 'object') {
    console.error('Eroare: report nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['reporter_id', 'reported_id', 'type', 'reason'];
  const hasRequiredProps = requiredProps.every(prop => report.hasOwnProperty(prop) && report[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Raportul nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (member: any): boolean => {
  if (!member || typeof member !== 'object') {
    console.error('Eroare: member nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => member.hasOwnProperty(prop) && member[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu
export const validateComment = (comment: any): boolean => {
  if (!comment || typeof comment !== 'object') {
    console.error('Eroare: comment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content', 'target_id', 'target_type'];
  const hasRequiredProps = requiredProps.every(prop => comment.hasOwnProperty(prop) && comment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like
export const validateLike = (like: any): boolean => {
  if (!like || typeof like !== 'object') {
    console.error('Eroare: like nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'target_id', 'target_type'];
  const hasRequiredProps = requiredProps.every(prop => like.hasOwnProperty(prop) && like[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Like-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui share
export const validateShare = (share: any): boolean => {
  if (!share || typeof share !== 'object') {
    console.error('Eroare: share nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'target_id', 'target_type'];
  const hasRequiredProps = requiredProps.every(prop => share.hasOwnProperty(prop) && share[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Share-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui follow
export const validateFollow = (follow: any): boolean => {
  if (!follow || typeof follow !== 'object') {
    console.error('Eroare: follow nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follower_id', 'followed_id'];
  const hasRequiredProps = requiredProps.every(prop => follow.hasOwnProperty(prop) && follow[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Follow-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui block
export const validateBlock = (block: any): boolean => {
  if (!block || typeof block !== 'object') {
    console.error('Eroare: block nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['blocker_id', 'blocked_id'];
  const hasRequiredProps = requiredProps.every(prop => block.hasOwnProperty(prop) && block[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Block-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag
export const validateTag = (tag: any): boolean => {
  if (!tag || typeof tag !== 'object') {
    console.error('Eroare: tag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description'];
  const hasRequiredProps = requiredProps.every(prop => tag.hasOwnProperty(prop) && tag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un anunț
export const validateListingTag = (listingTag: any): boolean => {
  if (!listingTag || typeof listingTag !== 'object') {
    console.error('Eroare: listingTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['listing_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => listingTag.hasOwnProperty(prop) && listingTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul anunțului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un utilizator
export const validateUserTag = (userTag: any): boolean => {
  if (!userTag || typeof userTag !== 'object') {
    console.error('Eroare: userTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => userTag.hasOwnProperty(prop) && userTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul utilizatorului nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup
export const validateGroupTag = (groupTag: any): boolean => {
  if (!groupTag || typeof groupTag !== 'object') {
    console.error('Eroare: groupTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupTag.hasOwnProperty(prop) && groupTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu
export const validateCommentTag = (commentTag: any): boolean => {
  if (!commentTag || typeof commentTag !== 'object') {
    console.error('Eroare: commentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => commentTag.hasOwnProperty(prop) && commentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un mesaj
export const validateMessageTag = (messageTag: any): boolean => {
  if (!messageTag || typeof messageTag !== 'object') {
    console.error('Eroare: messageTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['message_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => messageTag.hasOwnProperty(prop) && messageTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul mesajului nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o conversație
export const validateConversationTag = (conversationTag: any): boolean => {
  if (!conversationTag || typeof conversationTag !== 'object') {
    console.error('Eroare: conversationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['conversation_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => conversationTag.hasOwnProperty(prop) && conversationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul conversației nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o notificare
export const validateNotificationTag = (notificationTag: any): boolean => {
  if (!notificationTag || typeof notificationTag !== 'object') {
    console.error('Eroare: notificationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['notification_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => notificationTag.hasOwnProperty(prop) && notificationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul notificării nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o tranzacție
export const validateTransactionTag = (transactionTag: any): boolean => {
  if (!transactionTag || typeof transactionTag !== 'object') {
    console.error('Eroare: transactionTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['transaction_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => transactionTag.hasOwnProperty(prop) && transactionTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul tranzacției nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un raport
export const validateReportTag = (reportTag: any): boolean => {
  if (!reportTag || typeof reportTag !== 'object') {
    console.error('Eroare: reportTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['report_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reportTag.hasOwnProperty(prop) && reportTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul raportului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un follow
export const validateFollowTag = (followTag: any): boolean => {
  if (!followTag || typeof followTag !== 'object') {
    console.error('Eroare: followTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follow_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => followTag.hasOwnProperty(prop) && followTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul follow-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un block
export const validateBlockTag = (blockTag: any): boolean => {
  if (!blockTag || typeof blockTag !== 'object') {
    console.error('Eroare: blockTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['block_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => blockTag.hasOwnProperty(prop) && blockTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul block-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un like
export const validateLikeTag = (likeTag: any): boolean => {
  if (!likeTag || typeof likeTag !== 'object') {
    console.error('Eroare: likeTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['like_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => likeTag.hasOwnProperty(prop) && likeTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul like-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un share
export const validateShareTag = (shareTag: any): boolean => {
  if (!shareTag || typeof shareTag !== 'object') {
    console.error('Eroare: shareTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['share_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => shareTag.hasOwnProperty(prop) && shareTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul share-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un review
export const validateReviewTag = (reviewTag: any): boolean => {
  if (!reviewTag || typeof reviewTag !== 'object') {
    console.error('Eroare: reviewTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['review_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reviewTag.hasOwnProperty(prop) && reviewTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul review-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un favorit
export const validateFavoriteTag = (favoriteTag: any): boolean => {
  if (!favoriteTag || typeof favoriteTag !== 'object') {
    console.error('Eroare: favoriteTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['favorite_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => favoriteTag.hasOwnProperty(prop) && favoriteTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul favoritului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup de membri
export const validateGroupMemberTag = (groupMemberTag: any): boolean => {
  if (!groupMemberTag || typeof groupMemberTag !== 'object') {
    console.error('Eroare: groupMemberTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_member_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupMemberTag.hasOwnProperty(prop) && groupMemberTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul membrului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment de grup
export const validateGroupEventTag = (groupEventTag: any): boolean => {
  if (!groupEventTag || typeof groupEventTag !== 'object') {
    console.error('Eroare: groupEventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupEventTag.hasOwnProperty(prop) && groupEventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu de grup
export const validateGroupCommentTag = (groupCommentTag: any): boolean => {
  if (!groupCommentTag || typeof groupCommentTag !== 'object') {
    console.error('Eroare: groupCommentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupCommentTag.hasOwnProperty(prop) && groupCommentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post de grup
export const validateGroupPostTag = (groupPostTag: any): boolean => {
  if (!groupPostTag || typeof groupPostTag !== 'object') {
    console.error('Eroare: groupPostTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupPostTag.hasOwnProperty(prop) && groupPostTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post
export const validatePostTag = (postTag: any): boolean => {
  if (!postTag || typeof postTag !== 'object') {
    console.error('Eroare: postTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => postTag.hasOwnProperty(prop) && postTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post
export const validatePost = (post: any): boolean => {
  if (!post || typeof post !== 'object') {
    console.error('Eroare: post nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => post.hasOwnProperty(prop) && post[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post de grup
export const validateGroupPost = (groupPost: any): boolean => {
  if (!groupPost || typeof groupPost !== 'object') {
    console.error('Eroare: groupPost nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupPost.hasOwnProperty(prop) && groupPost[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu de grup
export const validateGroupComment = (groupComment: any): boolean => {
  if (!groupComment || typeof groupComment !== 'object') {
    console.error('Eroare: groupComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupComment.hasOwnProperty(prop) && groupComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment de grup
export const validateGroupEvent = (groupEvent: any): boolean => {
  if (!groupEvent || typeof groupEvent !== 'object') {
    console.error('Eroare: groupEvent nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => groupEvent.hasOwnProperty(prop) && groupEvent[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment de grup
export const validateGroupEventMember = (groupEventMember: any): boolean => {
  if (!groupEventMember || typeof groupEventMember !== 'object') {
    console.error('Eroare: groupEventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => groupEventMember.hasOwnProperty(prop) && groupEventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (groupMember: any): boolean => {
  if (!groupMember || typeof groupMember !== 'object') {
    console.error('Eroare: groupMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => groupMember.hasOwnProperty(prop) && groupMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment
export const validateEventMember = (eventMember: any): boolean => {
  if (!eventMember || typeof eventMember !== 'object') {
    console.error('Eroare: eventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => eventMember.hasOwnProperty(prop) && eventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu al unui eveniment
export const validateEventComment = (eventComment: any): boolean => {
  if (!eventComment || typeof eventComment !== 'object') {
    console.error('Eroare: eventComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => eventComment.hasOwnProperty(prop) && eventComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like al unui eveniment
export const validateEventLike = (eventLike: any): boolean => {
  if (!eventLike || typeof eventLike !== 'object') {
    console.error('Eroare: eventLike nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventLike.hasOwnProperty(prop) && eventLike[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Like-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_LIKE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui share al unui eveniment
export const validateEventShare = (eventShare: any): boolean => {
  if (!eventShare || typeof eventShare !== 'object') {
    console.error('Eroare: eventShare nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventShare.hasOwnProperty(prop) && eventShare[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Share-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_SHARE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag al unui eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag
export const validateTag = (tag: any): boolean => {
  if (!tag || typeof tag !== 'object') {
    console.error('Eroare: tag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description'];
  const hasRequiredProps = requiredProps.every(prop => tag.hasOwnProperty(prop) && tag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un anunț
export const validateListingTag = (listingTag: any): boolean => {
  if (!listingTag || typeof listingTag !== 'object') {
    console.error('Eroare: listingTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['listing_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => listingTag.hasOwnProperty(prop) && listingTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul anunțului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un utilizator
export const validateUserTag = (userTag: any): boolean => {
  if (!userTag || typeof userTag !== 'object') {
    console.error('Eroare: userTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => userTag.hasOwnProperty(prop) && userTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul utilizatorului nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup
export const validateGroupTag = (groupTag: any): boolean => {
  if (!groupTag || typeof groupTag !== 'object') {
    console.error('Eroare: groupTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupTag.hasOwnProperty(prop) && groupTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu
export const validateCommentTag = (commentTag: any): boolean => {
  if (!commentTag || typeof commentTag !== 'object') {
    console.error('Eroare: commentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => commentTag.hasOwnProperty(prop) && commentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un mesaj
export const validateMessageTag = (messageTag: any): boolean => {
  if (!messageTag || typeof messageTag !== 'object') {
    console.error('Eroare: messageTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['message_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => messageTag.hasOwnProperty(prop) && messageTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul mesajului nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o conversație
export const validateConversationTag = (conversationTag: any): boolean => {
  if (!conversationTag || typeof conversationTag !== 'object') {
    console.error('Eroare: conversationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['conversation_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => conversationTag.hasOwnProperty(prop) && conversationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul conversației nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o notificare
export const validateNotificationTag = (notificationTag: any): boolean => {
  if (!notificationTag || typeof notificationTag !== 'object') {
    console.error('Eroare: notificationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['notification_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => notificationTag.hasOwnProperty(prop) && notificationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul notificării nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o tranzacție
export const validateTransactionTag = (transactionTag: any): boolean => {
  if (!transactionTag || typeof transactionTag !== 'object') {
    console.error('Eroare: transactionTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['transaction_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => transactionTag.hasOwnProperty(prop) && transactionTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul tranzacției nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un raport
export const validateReportTag = (reportTag: any): boolean => {
  if (!reportTag || typeof reportTag !== 'object') {
    console.error('Eroare: reportTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['report_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reportTag.hasOwnProperty(prop) && reportTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul raportului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un follow
export const validateFollowTag = (followTag: any): boolean => {
  if (!followTag || typeof followTag !== 'object') {
    console.error('Eroare: followTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follow_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => followTag.hasOwnProperty(prop) && followTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul follow-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un block
export const validateBlockTag = (blockTag: any): boolean => {
  if (!blockTag || typeof blockTag !== 'object') {
    console.error('Eroare: blockTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['block_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => blockTag.hasOwnProperty(prop) && blockTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul block-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un like
export const validateLikeTag = (likeTag: any): boolean => {
  if (!likeTag || typeof likeTag !== 'object') {
    console.error('Eroare: likeTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['like_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => likeTag.hasOwnProperty(prop) && likeTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul like-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un share
export const validateShareTag = (shareTag: any): boolean => {
  if (!shareTag || typeof shareTag !== 'object') {
    console.error('Eroare: shareTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['share_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => shareTag.hasOwnProperty(prop) && shareTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul share-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un review
export const validateReviewTag = (reviewTag: any): boolean => {
  if (!reviewTag || typeof reviewTag !== 'object') {
    console.error('Eroare: reviewTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['review_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reviewTag.hasOwnProperty(prop) && reviewTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul review-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un favorit
export const validateFavoriteTag = (favoriteTag: any): boolean => {
  if (!favoriteTag || typeof favoriteTag !== 'object') {
    console.error('Eroare: favoriteTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['favorite_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => favoriteTag.hasOwnProperty(prop) && favoriteTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul favoritului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup de membri
export const validateGroupMemberTag = (groupMemberTag: any): boolean => {
  if (!groupMemberTag || typeof groupMemberTag !== 'object') {
    console.error('Eroare: groupMemberTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_member_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupMemberTag.hasOwnProperty(prop) && groupMemberTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul membrului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment de grup
export const validateGroupEventTag = (groupEventTag: any): boolean => {
  if (!groupEventTag || typeof groupEventTag !== 'object') {
    console.error('Eroare: groupEventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupEventTag.hasOwnProperty(prop) && groupEventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu de grup
export const validateGroupCommentTag = (groupCommentTag: any): boolean => {
  if (!groupCommentTag || typeof groupCommentTag !== 'object') {
    console.error('Eroare: groupCommentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupCommentTag.hasOwnProperty(prop) && groupCommentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post de grup
export const validateGroupPostTag = (groupPostTag: any): boolean => {
  if (!groupPostTag || typeof groupPostTag !== 'object') {
    console.error('Eroare: groupPostTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupPostTag.hasOwnProperty(prop) && groupPostTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post
export const validatePostTag = (postTag: any): boolean => {
  if (!postTag || typeof postTag !== 'object') {
    console.error('Eroare: postTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => postTag.hasOwnProperty(prop) && postTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post
export const validatePost = (post: any): boolean => {
  if (!post || typeof post !== 'object') {
    console.error('Eroare: post nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => post.hasOwnProperty(prop) && post[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post de grup
export const validateGroupPost = (groupPost: any): boolean => {
  if (!groupPost || typeof groupPost !== 'object') {
    console.error('Eroare: groupPost nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupPost.hasOwnProperty(prop) && groupPost[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu de grup
export const validateGroupComment = (groupComment: any): boolean => {
  if (!groupComment || typeof groupComment !== 'object') {
    console.error('Eroare: groupComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupComment.hasOwnProperty(prop) && groupComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment de grup
export const validateGroupEvent = (groupEvent: any): boolean => {
  if (!groupEvent || typeof groupEvent !== 'object') {
    console.error('Eroare: groupEvent nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => groupEvent.hasOwnProperty(prop) && groupEvent[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment de grup
export const validateGroupEventMember = (groupEventMember: any): boolean => {
  if (!groupEventMember || typeof groupEventMember !== 'object') {
    console.error('Eroare: groupEventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => groupEventMember.hasOwnProperty(prop) && groupEventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (groupMember: any): boolean => {
  if (!groupMember || typeof groupMember !== 'object') {
    console.error('Eroare: groupMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => groupMember.hasOwnProperty(prop) && groupMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment
export const validateEventMember = (eventMember: any): boolean => {
  if (!eventMember || typeof eventMember !== 'object') {
    console.error('Eroare: eventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => eventMember.hasOwnProperty(prop) && eventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu al unui eveniment
export const validateEventComment = (eventComment: any): boolean => {
  if (!eventComment || typeof eventComment !== 'object') {
    console.error('Eroare: eventComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => eventComment.hasOwnProperty(prop) && eventComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like al unui eveniment
export const validateEventLike = (eventLike: any): boolean => {
  if (!eventLike || typeof eventLike !== 'object') {
    console.error('Eroare: eventLike nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventLike.hasOwnProperty(prop) && eventLike[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Like-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_LIKE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui share al unui eveniment
export const validateEventShare = (eventShare: any): boolean => {
  if (!eventShare || typeof eventShare !== 'object') {
    console.error('Eroare: eventShare nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventShare.hasOwnProperty(prop) && eventShare[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Share-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_SHARE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag al unui eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag
export const validateTag = (tag: any): boolean => {
  if (!tag || typeof tag !== 'object') {
    console.error('Eroare: tag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description'];
  const hasRequiredProps = requiredProps.every(prop => tag.hasOwnProperty(prop) && tag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un anunț
export const validateListingTag = (listingTag: any): boolean => {
  if (!listingTag || typeof listingTag !== 'object') {
    console.error('Eroare: listingTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['listing_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => listingTag.hasOwnProperty(prop) && listingTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul anunțului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un utilizator
export const validateUserTag = (userTag: any): boolean => {
  if (!userTag || typeof userTag !== 'object') {
    console.error('Eroare: userTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => userTag.hasOwnProperty(prop) && userTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul utilizatorului nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup
export const validateGroupTag = (groupTag: any): boolean => {
  if (!groupTag || typeof groupTag !== 'object') {
    console.error('Eroare: groupTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupTag.hasOwnProperty(prop) && groupTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu
export const validateCommentTag = (commentTag: any): boolean => {
  if (!commentTag || typeof commentTag !== 'object') {
    console.error('Eroare: commentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => commentTag.hasOwnProperty(prop) && commentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un mesaj
export const validateMessageTag = (messageTag: any): boolean => {
  if (!messageTag || typeof messageTag !== 'object') {
    console.error('Eroare: messageTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['message_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => messageTag.hasOwnProperty(prop) && messageTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul mesajului nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o conversație
export const validateConversationTag = (conversationTag: any): boolean => {
  if (!conversationTag || typeof conversationTag !== 'object') {
    console.error('Eroare: conversationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['conversation_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => conversationTag.hasOwnProperty(prop) && conversationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul conversației nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o notificare
export const validateNotificationTag = (notificationTag: any): boolean => {
  if (!notificationTag || typeof notificationTag !== 'object') {
    console.error('Eroare: notificationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['notification_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => notificationTag.hasOwnProperty(prop) && notificationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul notificării nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o tranzacție
export const validateTransactionTag = (transactionTag: any): boolean => {
  if (!transactionTag || typeof transactionTag !== 'object') {
    console.error('Eroare: transactionTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['transaction_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => transactionTag.hasOwnProperty(prop) && transactionTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul tranzacției nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un raport
export const validateReportTag = (reportTag: any): boolean => {
  if (!reportTag || typeof reportTag !== 'object') {
    console.error('Eroare: reportTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['report_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reportTag.hasOwnProperty(prop) && reportTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul raportului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un follow
export const validateFollowTag = (followTag: any): boolean => {
  if (!followTag || typeof followTag !== 'object') {
    console.error('Eroare: followTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follow_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => followTag.hasOwnProperty(prop) && followTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul follow-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un block
export const validateBlockTag = (blockTag: any): boolean => {
  if (!blockTag || typeof blockTag !== 'object') {
    console.error('Eroare: blockTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['block_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => blockTag.hasOwnProperty(prop) && blockTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul block-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un like
export const validateLikeTag = (likeTag: any): boolean => {
  if (!likeTag || typeof likeTag !== 'object') {
    console.error('Eroare: likeTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['like_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => likeTag.hasOwnProperty(prop) && likeTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul like-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un share
export const validateShareTag = (shareTag: any): boolean => {
  if (!shareTag || typeof shareTag !== 'object') {
    console.error('Eroare: shareTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['share_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => shareTag.hasOwnProperty(prop) && shareTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul share-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un review
export const validateReviewTag = (reviewTag: any): boolean => {
  if (!reviewTag || typeof reviewTag !== 'object') {
    console.error('Eroare: reviewTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['review_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reviewTag.hasOwnProperty(prop) && reviewTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul review-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un favorit
export const validateFavoriteTag = (favoriteTag: any): boolean => {
  if (!favoriteTag || typeof favoriteTag !== 'object') {
    console.error('Eroare: favoriteTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['favorite_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => favoriteTag.hasOwnProperty(prop) && favoriteTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul favoritului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup de membri
export const validateGroupMemberTag = (groupMemberTag: any): boolean => {
  if (!groupMemberTag || typeof groupMemberTag !== 'object') {
    console.error('Eroare: groupMemberTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_member_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupMemberTag.hasOwnProperty(prop) && groupMemberTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul membrului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment de grup
export const validateGroupEventTag = (groupEventTag: any): boolean => {
  if (!groupEventTag || typeof groupEventTag !== 'object') {
    console.error('Eroare: groupEventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupEventTag.hasOwnProperty(prop) && groupEventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu de grup
export const validateGroupCommentTag = (groupCommentTag: any): boolean => {
  if (!groupCommentTag || typeof groupCommentTag !== 'object') {
    console.error('Eroare: groupCommentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupCommentTag.hasOwnProperty(prop) && groupCommentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post de grup
export const validateGroupPostTag = (groupPostTag: any): boolean => {
  if (!groupPostTag || typeof groupPostTag !== 'object') {
    console.error('Eroare: groupPostTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupPostTag.hasOwnProperty(prop) && groupPostTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post
export const validatePostTag = (postTag: any): boolean => {
  if (!postTag || typeof postTag !== 'object') {
    console.error('Eroare: postTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => postTag.hasOwnProperty(prop) && postTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post
export const validatePost = (post: any): boolean => {
  if (!post || typeof post !== 'object') {
    console.error('Eroare: post nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => post.hasOwnProperty(prop) && post[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post de grup
export const validateGroupPost = (groupPost: any): boolean => {
  if (!groupPost || typeof groupPost !== 'object') {
    console.error('Eroare: groupPost nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupPost.hasOwnProperty(prop) && groupPost[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu de grup
export const validateGroupComment = (groupComment: any): boolean => {
  if (!groupComment || typeof groupComment !== 'object') {
    console.error('Eroare: groupComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupComment.hasOwnProperty(prop) && groupComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment de grup
export const validateGroupEvent = (groupEvent: any): boolean => {
  if (!groupEvent || typeof groupEvent !== 'object') {
    console.error('Eroare: groupEvent nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => groupEvent.hasOwnProperty(prop) && groupEvent[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment de grup
export const validateGroupEventMember = (groupEventMember: any): boolean => {
  if (!groupEventMember || typeof groupEventMember !== 'object') {
    console.error('Eroare: groupEventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => groupEventMember.hasOwnProperty(prop) && groupEventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (groupMember: any): boolean => {
  if (!groupMember || typeof groupMember !== 'object') {
    console.error('Eroare: groupMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => groupMember.hasOwnProperty(prop) && groupMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment
export const validateEventMember = (eventMember: any): boolean => {
  if (!eventMember || typeof eventMember !== 'object') {
    console.error('Eroare: eventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => eventMember.hasOwnProperty(prop) && eventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu al unui eveniment
export const validateEventComment = (eventComment: any): boolean => {
  if (!eventComment || typeof eventComment !== 'object') {
    console.error('Eroare: eventComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => eventComment.hasOwnProperty(prop) && eventComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like al unui eveniment
export const validateEventLike = (eventLike: any): boolean => {
  if (!eventLike || typeof eventLike !== 'object') {
    console.error('Eroare: eventLike nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventLike.hasOwnProperty(prop) && eventLike[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Like-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_LIKE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui share al unui eveniment
export const validateEventShare = (eventShare: any): boolean => {
  if (!eventShare || typeof eventShare !== 'object') {
    console.error('Eroare: eventShare nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventShare.hasOwnProperty(prop) && eventShare[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Share-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_SHARE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag al unui eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag
export const validateTag = (tag: any): boolean => {
  if (!tag || typeof tag !== 'object') {
    console.error('Eroare: tag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description'];
  const hasRequiredProps = requiredProps.every(prop => tag.hasOwnProperty(prop) && tag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un anunț
export const validateListingTag = (listingTag: any): boolean => {
  if (!listingTag || typeof listingTag !== 'object') {
    console.error('Eroare: listingTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['listing_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => listingTag.hasOwnProperty(prop) && listingTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul anunțului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un utilizator
export const validateUserTag = (userTag: any): boolean => {
  if (!userTag || typeof userTag !== 'object') {
    console.error('Eroare: userTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => userTag.hasOwnProperty(prop) && userTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul utilizatorului nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup
export const validateGroupTag = (groupTag: any): boolean => {
  if (!groupTag || typeof groupTag !== 'object') {
    console.error('Eroare: groupTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupTag.hasOwnProperty(prop) && groupTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu
export const validateCommentTag = (commentTag: any): boolean => {
  if (!commentTag || typeof commentTag !== 'object') {
    console.error('Eroare: commentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => commentTag.hasOwnProperty(prop) && commentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un mesaj
export const validateMessageTag = (messageTag: any): boolean => {
  if (!messageTag || typeof messageTag !== 'object') {
    console.error('Eroare: messageTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['message_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => messageTag.hasOwnProperty(prop) && messageTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul mesajului nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o conversație
export const validateConversationTag = (conversationTag: any): boolean => {
  if (!conversationTag || typeof conversationTag !== 'object') {
    console.error('Eroare: conversationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['conversation_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => conversationTag.hasOwnProperty(prop) && conversationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul conversației nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o notificare
export const validateNotificationTag = (notificationTag: any): boolean => {
  if (!notificationTag || typeof notificationTag !== 'object') {
    console.error('Eroare: notificationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['notification_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => notificationTag.hasOwnProperty(prop) && notificationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul notificării nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o tranzacție
export const validateTransactionTag = (transactionTag: any): boolean => {
  if (!transactionTag || typeof transactionTag !== 'object') {
    console.error('Eroare: transactionTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['transaction_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => transactionTag.hasOwnProperty(prop) && transactionTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul tranzacției nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un raport
export const validateReportTag = (reportTag: any): boolean => {
  if (!reportTag || typeof reportTag !== 'object') {
    console.error('Eroare: reportTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['report_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reportTag.hasOwnProperty(prop) && reportTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul raportului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un follow
export const validateFollowTag = (followTag: any): boolean => {
  if (!followTag || typeof followTag !== 'object') {
    console.error('Eroare: followTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follow_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => followTag.hasOwnProperty(prop) && followTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul follow-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un block
export const validateBlockTag = (blockTag: any): boolean => {
  if (!blockTag || typeof blockTag !== 'object') {
    console.error('Eroare: blockTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['block_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => blockTag.hasOwnProperty(prop) && blockTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul block-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un like
export const validateLikeTag = (likeTag: any): boolean => {
  if (!likeTag || typeof likeTag !== 'object') {
    console.error('Eroare: likeTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['like_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => likeTag.hasOwnProperty(prop) && likeTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul like-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un share
export const validateShareTag = (shareTag: any): boolean => {
  if (!shareTag || typeof shareTag !== 'object') {
    console.error('Eroare: shareTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['share_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => shareTag.hasOwnProperty(prop) && shareTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul share-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un review
export const validateReviewTag = (reviewTag: any): boolean => {
  if (!reviewTag || typeof reviewTag !== 'object') {
    console.error('Eroare: reviewTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['review_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reviewTag.hasOwnProperty(prop) && reviewTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul review-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un favorit
export const validateFavoriteTag = (favoriteTag: any): boolean => {
  if (!favoriteTag || typeof favoriteTag !== 'object') {
    console.error('Eroare: favoriteTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['favorite_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => favoriteTag.hasOwnProperty(prop) && favoriteTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul favoritului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup de membri
export const validateGroupMemberTag = (groupMemberTag: any): boolean => {
  if (!groupMemberTag || typeof groupMemberTag !== 'object') {
    console.error('Eroare: groupMemberTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_member_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupMemberTag.hasOwnProperty(prop) && groupMemberTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul membrului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment de grup
export const validateGroupEventTag = (groupEventTag: any): boolean => {
  if (!groupEventTag || typeof groupEventTag !== 'object') {
    console.error('Eroare: groupEventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupEventTag.hasOwnProperty(prop) && groupEventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu de grup
export const validateGroupCommentTag = (groupCommentTag: any): boolean => {
  if (!groupCommentTag || typeof groupCommentTag !== 'object') {
    console.error('Eroare: groupCommentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupCommentTag.hasOwnProperty(prop) && groupCommentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post de grup
export const validateGroupPostTag = (groupPostTag: any): boolean => {
  if (!groupPostTag || typeof groupPostTag !== 'object') {
    console.error('Eroare: groupPostTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupPostTag.hasOwnProperty(prop) && groupPostTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post
export const validatePostTag = (postTag: any): boolean => {
  if (!postTag || typeof postTag !== 'object') {
    console.error('Eroare: postTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => postTag.hasOwnProperty(prop) && postTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post
export const validatePost = (post: any): boolean => {
  if (!post || typeof post !== 'object') {
    console.error('Eroare: post nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => post.hasOwnProperty(prop) && post[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post de grup
export const validateGroupPost = (groupPost: any): boolean => {
  if (!groupPost || typeof groupPost !== 'object') {
    console.error('Eroare: groupPost nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupPost.hasOwnProperty(prop) && groupPost[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu de grup
export const validateGroupComment = (groupComment: any): boolean => {
  if (!groupComment || typeof groupComment !== 'object') {
    console.error('Eroare: groupComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupComment.hasOwnProperty(prop) && groupComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment de grup
export const validateGroupEvent = (groupEvent: any): boolean => {
  if (!groupEvent || typeof groupEvent !== 'object') {
    console.error('Eroare: groupEvent nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => groupEvent.hasOwnProperty(prop) && groupEvent[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment de grup
export const validateGroupEventMember = (groupEventMember: any): boolean => {
  if (!groupEventMember || typeof groupEventMember !== 'object') {
    console.error('Eroare: groupEventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => groupEventMember.hasOwnProperty(prop) && groupEventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (groupMember: any): boolean => {
  if (!groupMember || typeof groupMember !== 'object') {
    console.error('Eroare: groupMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => groupMember.hasOwnProperty(prop) && groupMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment
export const validateEventMember = (eventMember: any): boolean => {
  if (!eventMember || typeof eventMember !== 'object') {
    console.error('Eroare: eventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => eventMember.hasOwnProperty(prop) && eventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu al unui eveniment
export const validateEventComment = (eventComment: any): boolean => {
  if (!eventComment || typeof eventComment !== 'object') {
    console.error('Eroare: eventComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => eventComment.hasOwnProperty(prop) && eventComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like al unui eveniment
export const validateEventLike = (eventLike: any): boolean => {
  if (!eventLike || typeof eventLike !== 'object') {
    console.error('Eroare: eventLike nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventLike.hasOwnProperty(prop) && eventLike[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Like-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_LIKE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui share al unui eveniment
export const validateEventShare = (eventShare: any): boolean => {
  if (!eventShare || typeof eventShare !== 'object') {
    console.error('Eroare: eventShare nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventShare.hasOwnProperty(prop) && eventShare[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Share-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_SHARE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag al unui eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag
export const validateTag = (tag: any): boolean => {
  if (!tag || typeof tag !== 'object') {
    console.error('Eroare: tag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description'];
  const hasRequiredProps = requiredProps.every(prop => tag.hasOwnProperty(prop) && tag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un anunț
export const validateListingTag = (listingTag: any): boolean => {
  if (!listingTag || typeof listingTag !== 'object') {
    console.error('Eroare: listingTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['listing_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => listingTag.hasOwnProperty(prop) && listingTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul anunțului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un utilizator
export const validateUserTag = (userTag: any): boolean => {
  if (!userTag || typeof userTag !== 'object') {
    console.error('Eroare: userTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => userTag.hasOwnProperty(prop) && userTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul utilizatorului nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup
export const validateGroupTag = (groupTag: any): boolean => {
  if (!groupTag || typeof groupTag !== 'object') {
    console.error('Eroare: groupTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupTag.hasOwnProperty(prop) && groupTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu
export const validateCommentTag = (commentTag: any): boolean => {
  if (!commentTag || typeof commentTag !== 'object') {
    console.error('Eroare: commentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => commentTag.hasOwnProperty(prop) && commentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un mesaj
export const validateMessageTag = (messageTag: any): boolean => {
  if (!messageTag || typeof messageTag !== 'object') {
    console.error('Eroare: messageTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['message_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => messageTag.hasOwnProperty(prop) && messageTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul mesajului nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o conversație
export const validateConversationTag = (conversationTag: any): boolean => {
  if (!conversationTag || typeof conversationTag !== 'object') {
    console.error('Eroare: conversationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['conversation_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => conversationTag.hasOwnProperty(prop) && conversationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul conversației nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o notificare
export const validateNotificationTag = (notificationTag: any): boolean => {
  if (!notificationTag || typeof notificationTag !== 'object') {
    console.error('Eroare: notificationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['notification_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => notificationTag.hasOwnProperty(prop) && notificationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul notificării nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o tranzacție
export const validateTransactionTag = (transactionTag: any): boolean => {
  if (!transactionTag || typeof transactionTag !== 'object') {
    console.error('Eroare: transactionTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['transaction_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => transactionTag.hasOwnProperty(prop) && transactionTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul tranzacției nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un raport
export const validateReportTag = (reportTag: any): boolean => {
  if (!reportTag || typeof reportTag !== 'object') {
    console.error('Eroare: reportTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['report_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reportTag.hasOwnProperty(prop) && reportTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul raportului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un follow
export const validateFollowTag = (followTag: any): boolean => {
  if (!followTag || typeof followTag !== 'object') {
    console.error('Eroare: followTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follow_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => followTag.hasOwnProperty(prop) && followTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul follow-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un block
export const validateBlockTag = (blockTag: any): boolean => {
  if (!blockTag || typeof blockTag !== 'object') {
    console.error('Eroare: blockTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['block_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => blockTag.hasOwnProperty(prop) && blockTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul block-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un like
export const validateLikeTag = (likeTag: any): boolean => {
  if (!likeTag || typeof likeTag !== 'object') {
    console.error('Eroare: likeTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['like_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => likeTag.hasOwnProperty(prop) && likeTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul like-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un share
export const validateShareTag = (shareTag: any): boolean => {
  if (!shareTag || typeof shareTag !== 'object') {
    console.error('Eroare: shareTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['share_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => shareTag.hasOwnProperty(prop) && shareTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul share-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un review
export const validateReviewTag = (reviewTag: any): boolean => {
  if (!reviewTag || typeof reviewTag !== 'object') {
    console.error('Eroare: reviewTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['review_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reviewTag.hasOwnProperty(prop) && reviewTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul review-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un favorit
export const validateFavoriteTag = (favoriteTag: any): boolean => {
  if (!favoriteTag || typeof favoriteTag !== 'object') {
    console.error('Eroare: favoriteTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['favorite_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => favoriteTag.hasOwnProperty(prop) && favoriteTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul favoritului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup de membri
export const validateGroupMemberTag = (groupMemberTag: any): boolean => {
  if (!groupMemberTag || typeof groupMemberTag !== 'object') {
    console.error('Eroare: groupMemberTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_member_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupMemberTag.hasOwnProperty(prop) && groupMemberTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul membrului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment de grup
export const validateGroupEventTag = (groupEventTag: any): boolean => {
  if (!groupEventTag || typeof groupEventTag !== 'object') {
    console.error('Eroare: groupEventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupEventTag.hasOwnProperty(prop) && groupEventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu de grup
export const validateGroupCommentTag = (groupCommentTag: any): boolean => {
  if (!groupCommentTag || typeof groupCommentTag !== 'object') {
    console.error('Eroare: groupCommentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupCommentTag.hasOwnProperty(prop) && groupCommentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post de grup
export const validateGroupPostTag = (groupPostTag: any): boolean => {
  if (!groupPostTag || typeof groupPostTag !== 'object') {
    console.error('Eroare: groupPostTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupPostTag.hasOwnProperty(prop) && groupPostTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post
export const validatePostTag = (postTag: any): boolean => {
  if (!postTag || typeof postTag !== 'object') {
    console.error('Eroare: postTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => postTag.hasOwnProperty(prop) && postTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post
export const validatePost = (post: any): boolean => {
  if (!post || typeof post !== 'object') {
    console.error('Eroare: post nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => post.hasOwnProperty(prop) && post[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post de grup
export const validateGroupPost = (groupPost: any): boolean => {
  if (!groupPost || typeof groupPost !== 'object') {
    console.error('Eroare: groupPost nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupPost.hasOwnProperty(prop) && groupPost[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu de grup
export const validateGroupComment = (groupComment: any): boolean => {
  if (!groupComment || typeof groupComment !== 'object') {
    console.error('Eroare: groupComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupComment.hasOwnProperty(prop) && groupComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment de grup
export const validateGroupEvent = (groupEvent: any): boolean => {
  if (!groupEvent || typeof groupEvent !== 'object') {
    console.error('Eroare: groupEvent nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => groupEvent.hasOwnProperty(prop) && groupEvent[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment de grup
export const validateGroupEventMember = (groupEventMember: any): boolean => {
  if (!groupEventMember || typeof groupEventMember !== 'object') {
    console.error('Eroare: groupEventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => groupEventMember.hasOwnProperty(prop) && groupEventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (groupMember: any): boolean => {
  if (!groupMember || typeof groupMember !== 'object') {
    console.error('Eroare: groupMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => groupMember.hasOwnProperty(prop) && groupMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment
export const validateEventMember = (eventMember: any): boolean => {
  if (!eventMember || typeof eventMember !== 'object') {
    console.error('Eroare: eventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => eventMember.hasOwnProperty(prop) && eventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu al unui eveniment
export const validateEventComment = (eventComment: any): boolean => {
  if (!eventComment || typeof eventComment !== 'object') {
    console.error('Eroare: eventComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => eventComment.hasOwnProperty(prop) && eventComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like al unui eveniment
export const validateEventLike = (eventLike: any): boolean => {
  if (!eventLike || typeof eventLike !== 'object') {
    console.error('Eroare: eventLike nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventLike.hasOwnProperty(prop) && eventLike[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Like-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_LIKE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui share al unui eveniment
export const validateEventShare = (eventShare: any): boolean => {
  if (!eventShare || typeof eventShare !== 'object') {
    console.error('Eroare: eventShare nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventShare.hasOwnProperty(prop) && eventShare[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Share-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_SHARE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag al unui eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag
export const validateTag = (tag: any): boolean => {
  if (!tag || typeof tag !== 'object') {
    console.error('Eroare: tag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description'];
  const hasRequiredProps = requiredProps.every(prop => tag.hasOwnProperty(prop) && tag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un anunț
export const validateListingTag = (listingTag: any): boolean => {
  if (!listingTag || typeof listingTag !== 'object') {
    console.error('Eroare: listingTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['listing_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => listingTag.hasOwnProperty(prop) && listingTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul anunțului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un utilizator
export const validateUserTag = (userTag: any): boolean => {
  if (!userTag || typeof userTag !== 'object') {
    console.error('Eroare: userTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => userTag.hasOwnProperty(prop) && userTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul utilizatorului nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup
export const validateGroupTag = (groupTag: any): boolean => {
  if (!groupTag || typeof groupTag !== 'object') {
    console.error('Eroare: groupTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupTag.hasOwnProperty(prop) && groupTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu
export const validateCommentTag = (commentTag: any): boolean => {
  if (!commentTag || typeof commentTag !== 'object') {
    console.error('Eroare: commentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => commentTag.hasOwnProperty(prop) && commentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un mesaj
export const validateMessageTag = (messageTag: any): boolean => {
  if (!messageTag || typeof messageTag !== 'object') {
    console.error('Eroare: messageTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['message_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => messageTag.hasOwnProperty(prop) && messageTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul mesajului nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o conversație
export const validateConversationTag = (conversationTag: any): boolean => {
  if (!conversationTag || typeof conversationTag !== 'object') {
    console.error('Eroare: conversationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['conversation_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => conversationTag.hasOwnProperty(prop) && conversationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul conversației nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o notificare
export const validateNotificationTag = (notificationTag: any): boolean => {
  if (!notificationTag || typeof notificationTag !== 'object') {
    console.error('Eroare: notificationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['notification_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => notificationTag.hasOwnProperty(prop) && notificationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul notificării nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o tranzacție
export const validateTransactionTag = (transactionTag: any): boolean => {
  if (!transactionTag || typeof transactionTag !== 'object') {
    console.error('Eroare: transactionTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['transaction_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => transactionTag.hasOwnProperty(prop) && transactionTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul tranzacției nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un raport
export const validateReportTag = (reportTag: any): boolean => {
  if (!reportTag || typeof reportTag !== 'object') {
    console.error('Eroare: reportTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['report_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reportTag.hasOwnProperty(prop) && reportTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul raportului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un follow
export const validateFollowTag = (followTag: any): boolean => {
  if (!followTag || typeof followTag !== 'object') {
    console.error('Eroare: followTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follow_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => followTag.hasOwnProperty(prop) && followTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul follow-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un block
export const validateBlockTag = (blockTag: any): boolean => {
  if (!blockTag || typeof blockTag !== 'object') {
    console.error('Eroare: blockTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['block_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => blockTag.hasOwnProperty(prop) && blockTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul block-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un like
export const validateLikeTag = (likeTag: any): boolean => {
  if (!likeTag || typeof likeTag !== 'object') {
    console.error('Eroare: likeTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['like_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => likeTag.hasOwnProperty(prop) && likeTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul like-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un share
export const validateShareTag = (shareTag: any): boolean => {
  if (!shareTag || typeof shareTag !== 'object') {
    console.error('Eroare: shareTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['share_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => shareTag.hasOwnProperty(prop) && shareTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul share-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un review
export const validateReviewTag = (reviewTag: any): boolean => {
  if (!reviewTag || typeof reviewTag !== 'object') {
    console.error('Eroare: reviewTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['review_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reviewTag.hasOwnProperty(prop) && reviewTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul review-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un favorit
export const validateFavoriteTag = (favoriteTag: any): boolean => {
  if (!favoriteTag || typeof favoriteTag !== 'object') {
    console.error('Eroare: favoriteTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['favorite_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => favoriteTag.hasOwnProperty(prop) && favoriteTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul favoritului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup de membri
export const validateGroupMemberTag = (groupMemberTag: any): boolean => {
  if (!groupMemberTag || typeof groupMemberTag !== 'object') {
    console.error('Eroare: groupMemberTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_member_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupMemberTag.hasOwnProperty(prop) && groupMemberTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul membrului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment de grup
export const validateGroupEventTag = (groupEventTag: any): boolean => {
  if (!groupEventTag || typeof groupEventTag !== 'object') {
    console.error('Eroare: groupEventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupEventTag.hasOwnProperty(prop) && groupEventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu de grup
export const validateGroupCommentTag = (groupCommentTag: any): boolean => {
  if (!groupCommentTag || typeof groupCommentTag !== 'object') {
    console.error('Eroare: groupCommentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupCommentTag.hasOwnProperty(prop) && groupCommentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post de grup
export const validateGroupPostTag = (groupPostTag: any): boolean => {
  if (!groupPostTag || typeof groupPostTag !== 'object') {
    console.error('Eroare: groupPostTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupPostTag.hasOwnProperty(prop) && groupPostTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post
export const validatePostTag = (postTag: any): boolean => {
  if (!postTag || typeof postTag !== 'object') {
    console.error('Eroare: postTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => postTag.hasOwnProperty(prop) && postTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post
export const validatePost = (post: any): boolean => {
  if (!post || typeof post !== 'object') {
    console.error('Eroare: post nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => post.hasOwnProperty(prop) && post[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post de grup
export const validateGroupPost = (groupPost: any): boolean => {
  if (!groupPost || typeof groupPost !== 'object') {
    console.error('Eroare: groupPost nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupPost.hasOwnProperty(prop) && groupPost[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu de grup
export const validateGroupComment = (groupComment: any): boolean => {
  if (!groupComment || typeof groupComment !== 'object') {
    console.error('Eroare: groupComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupComment.hasOwnProperty(prop) && groupComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment de grup
export const validateGroupEvent = (groupEvent: any): boolean => {
  if (!groupEvent || typeof groupEvent !== 'object') {
    console.error('Eroare: groupEvent nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => groupEvent.hasOwnProperty(prop) && groupEvent[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment de grup
export const validateGroupEventMember = (groupEventMember: any): boolean => {
  if (!groupEventMember || typeof groupEventMember !== 'object') {
    console.error('Eroare: groupEventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => groupEventMember.hasOwnProperty(prop) && groupEventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (groupMember: any): boolean => {
  if (!groupMember || typeof groupMember !== 'object') {
    console.error('Eroare: groupMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => groupMember.hasOwnProperty(prop) && groupMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment
export const validateEventMember = (eventMember: any): boolean => {
  if (!eventMember || typeof eventMember !== 'object') {
    console.error('Eroare: eventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => eventMember.hasOwnProperty(prop) && eventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu al unui eveniment
export const validateEventComment = (eventComment: any): boolean => {
  if (!eventComment || typeof eventComment !== 'object') {
    console.error('Eroare: eventComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => eventComment.hasOwnProperty(prop) && eventComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like al unui eveniment
export const validateEventLike = (eventLike: any): boolean => {
  if (!eventLike || typeof eventLike !== 'object') {
    console.error('Eroare: eventLike nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventLike.hasOwnProperty(prop) && eventLike[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Like-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_LIKE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui share al unui eveniment
export const validateEventShare = (eventShare: any): boolean => {
  if (!eventShare || typeof eventShare !== 'object') {
    console.error('Eroare: eventShare nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventShare.hasOwnProperty(prop) && eventShare[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Share-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_SHARE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag al unui eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag
export const validateTag = (tag: any): boolean => {
  if (!tag || typeof tag !== 'object') {
    console.error('Eroare: tag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description'];
  const hasRequiredProps = requiredProps.every(prop => tag.hasOwnProperty(prop) && tag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un anunț
export const validateListingTag = (listingTag: any): boolean => {
  if (!listingTag || typeof listingTag !== 'object') {
    console.error('Eroare: listingTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['listing_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => listingTag.hasOwnProperty(prop) && listingTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul anunțului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un utilizator
export const validateUserTag = (userTag: any): boolean => {
  if (!userTag || typeof userTag !== 'object') {
    console.error('Eroare: userTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => userTag.hasOwnProperty(prop) && userTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul utilizatorului nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup
export const validateGroupTag = (groupTag: any): boolean => {
  if (!groupTag || typeof groupTag !== 'object') {
    console.error('Eroare: groupTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupTag.hasOwnProperty(prop) && groupTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu
export const validateCommentTag = (commentTag: any): boolean => {
  if (!commentTag || typeof commentTag !== 'object') {
    console.error('Eroare: commentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => commentTag.hasOwnProperty(prop) && commentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un mesaj
export const validateMessageTag = (messageTag: any): boolean => {
  if (!messageTag || typeof messageTag !== 'object') {
    console.error('Eroare: messageTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['message_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => messageTag.hasOwnProperty(prop) && messageTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul mesajului nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o conversație
export const validateConversationTag = (conversationTag: any): boolean => {
  if (!conversationTag || typeof conversationTag !== 'object') {
    console.error('Eroare: conversationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['conversation_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => conversationTag.hasOwnProperty(prop) && conversationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul conversației nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o notificare
export const validateNotificationTag = (notificationTag: any): boolean => {
  if (!notificationTag || typeof notificationTag !== 'object') {
    console.error('Eroare: notificationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['notification_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => notificationTag.hasOwnProperty(prop) && notificationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul notificării nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o tranzacție
export const validateTransactionTag = (transactionTag: any): boolean => {
  if (!transactionTag || typeof transactionTag !== 'object') {
    console.error('Eroare: transactionTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['transaction_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => transactionTag.hasOwnProperty(prop) && transactionTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul tranzacției nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un raport
export const validateReportTag = (reportTag: any): boolean => {
  if (!reportTag || typeof reportTag !== 'object') {
    console.error('Eroare: reportTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['report_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reportTag.hasOwnProperty(prop) && reportTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul raportului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un follow
export const validateFollowTag = (followTag: any): boolean => {
  if (!followTag || typeof followTag !== 'object') {
    console.error('Eroare: followTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follow_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => followTag.hasOwnProperty(prop) && followTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul follow-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un block
export const validateBlockTag = (blockTag: any): boolean => {
  if (!blockTag || typeof blockTag !== 'object') {
    console.error('Eroare: blockTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['block_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => blockTag.hasOwnProperty(prop) && blockTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul block-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un like
export const validateLikeTag = (likeTag: any): boolean => {
  if (!likeTag || typeof likeTag !== 'object') {
    console.error('Eroare: likeTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['like_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => likeTag.hasOwnProperty(prop) && likeTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul like-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un share
export const validateShareTag = (shareTag: any): boolean => {
  if (!shareTag || typeof shareTag !== 'object') {
    console.error('Eroare: shareTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['share_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => shareTag.hasOwnProperty(prop) && shareTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul share-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un review
export const validateReviewTag = (reviewTag: any): boolean => {
  if (!reviewTag || typeof reviewTag !== 'object') {
    console.error('Eroare: reviewTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['review_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reviewTag.hasOwnProperty(prop) && reviewTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul review-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un favorit
export const validateFavoriteTag = (favoriteTag: any): boolean => {
  if (!favoriteTag || typeof favoriteTag !== 'object') {
    console.error('Eroare: favoriteTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['favorite_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => favoriteTag.hasOwnProperty(prop) && favoriteTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul favoritului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup de membri
export const validateGroupMemberTag = (groupMemberTag: any): boolean => {
  if (!groupMemberTag || typeof groupMemberTag !== 'object') {
    console.error('Eroare: groupMemberTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_member_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupMemberTag.hasOwnProperty(prop) && groupMemberTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul membrului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment de grup
export const validateGroupEventTag = (groupEventTag: any): boolean => {
  if (!groupEventTag || typeof groupEventTag !== 'object') {
    console.error('Eroare: groupEventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupEventTag.hasOwnProperty(prop) && groupEventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu de grup
export const validateGroupCommentTag = (groupCommentTag: any): boolean => {
  if (!groupCommentTag || typeof groupCommentTag !== 'object') {
    console.error('Eroare: groupCommentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupCommentTag.hasOwnProperty(prop) && groupCommentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post de grup
export const validateGroupPostTag = (groupPostTag: any): boolean => {
  if (!groupPostTag || typeof groupPostTag !== 'object') {
    console.error('Eroare: groupPostTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupPostTag.hasOwnProperty(prop) && groupPostTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post
export const validatePostTag = (postTag: any): boolean => {
  if (!postTag || typeof postTag !== 'object') {
    console.error('Eroare: postTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => postTag.hasOwnProperty(prop) && postTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post
export const validatePost = (post: any): boolean => {
  if (!post || typeof post !== 'object') {
    console.error('Eroare: post nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => post.hasOwnProperty(prop) && post[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post de grup
export const validateGroupPost = (groupPost: any): boolean => {
  if (!groupPost || typeof groupPost !== 'object') {
    console.error('Eroare: groupPost nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupPost.hasOwnProperty(prop) && groupPost[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu de grup
export const validateGroupComment = (groupComment: any): boolean => {
  if (!groupComment || typeof groupComment !== 'object') {
    console.error('Eroare: groupComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupComment.hasOwnProperty(prop) && groupComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment de grup
export const validateGroupEvent = (groupEvent: any): boolean => {
  if (!groupEvent || typeof groupEvent !== 'object') {
    console.error('Eroare: groupEvent nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => groupEvent.hasOwnProperty(prop) && groupEvent[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment de grup
export const validateGroupEventMember = (groupEventMember: any): boolean => {
  if (!groupEventMember || typeof groupEventMember !== 'object') {
    console.error('Eroare: groupEventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => groupEventMember.hasOwnProperty(prop) && groupEventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (groupMember: any): boolean => {
  if (!groupMember || typeof groupMember !== 'object') {
    console.error('Eroare: groupMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => groupMember.hasOwnProperty(prop) && groupMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment
export const validateEventMember = (eventMember: any): boolean => {
  if (!eventMember || typeof eventMember !== 'object') {
    console.error('Eroare: eventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => eventMember.hasOwnProperty(prop) && eventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu al unui eveniment
export const validateEventComment = (eventComment: any): boolean => {
  if (!eventComment || typeof eventComment !== 'object') {
    console.error('Eroare: eventComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => eventComment.hasOwnProperty(prop) && eventComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like al unui eveniment
export const validateEventLike = (eventLike: any): boolean => {
  if (!eventLike || typeof eventLike !== 'object') {
    console.error('Eroare: eventLike nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventLike.hasOwnProperty(prop) && eventLike[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Like-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_LIKE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui share al unui eveniment
export const validateEventShare = (eventShare: any): boolean => {
  if (!eventShare || typeof eventShare !== 'object') {
    console.error('Eroare: eventShare nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventShare.hasOwnProperty(prop) && eventShare[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Share-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_SHARE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag al unui eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag
export const validateTag = (tag: any): boolean => {
  if (!tag || typeof tag !== 'object') {
    console.error('Eroare: tag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description'];
  const hasRequiredProps = requiredProps.every(prop => tag.hasOwnProperty(prop) && tag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un anunț
export const validateListingTag = (listingTag: any): boolean => {
  if (!listingTag || typeof listingTag !== 'object') {
    console.error('Eroare: listingTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['listing_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => listingTag.hasOwnProperty(prop) && listingTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul anunțului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un utilizator
export const validateUserTag = (userTag: any): boolean => {
  if (!userTag || typeof userTag !== 'object') {
    console.error('Eroare: userTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => userTag.hasOwnProperty(prop) && userTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul utilizatorului nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup
export const validateGroupTag = (groupTag: any): boolean => {
  if (!groupTag || typeof groupTag !== 'object') {
    console.error('Eroare: groupTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupTag.hasOwnProperty(prop) && groupTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu
export const validateCommentTag = (commentTag: any): boolean => {
  if (!commentTag || typeof commentTag !== 'object') {
    console.error('Eroare: commentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => commentTag.hasOwnProperty(prop) && commentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un mesaj
export const validateMessageTag = (messageTag: any): boolean => {
  if (!messageTag || typeof messageTag !== 'object') {
    console.error('Eroare: messageTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['message_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => messageTag.hasOwnProperty(prop) && messageTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul mesajului nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o conversație
export const validateConversationTag = (conversationTag: any): boolean => {
  if (!conversationTag || typeof conversationTag !== 'object') {
    console.error('Eroare: conversationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['conversation_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => conversationTag.hasOwnProperty(prop) && conversationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul conversației nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o notificare
export const validateNotificationTag = (notificationTag: any): boolean => {
  if (!notificationTag || typeof notificationTag !== 'object') {
    console.error('Eroare: notificationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['notification_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => notificationTag.hasOwnProperty(prop) && notificationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul notificării nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o tranzacție
export const validateTransactionTag = (transactionTag: any): boolean => {
  if (!transactionTag || typeof transactionTag !== 'object') {
    console.error('Eroare: transactionTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['transaction_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => transactionTag.hasOwnProperty(prop) && transactionTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul tranzacției nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un raport
export const validateReportTag = (reportTag: any): boolean => {
  if (!reportTag || typeof reportTag !== 'object') {
    console.error('Eroare: reportTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['report_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reportTag.hasOwnProperty(prop) && reportTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul raportului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un follow
export const validateFollowTag = (followTag: any): boolean => {
  if (!followTag || typeof followTag !== 'object') {
    console.error('Eroare: followTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follow_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => followTag.hasOwnProperty(prop) && followTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul follow-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un block
export const validateBlockTag = (blockTag: any): boolean => {
  if (!blockTag || typeof blockTag !== 'object') {
    console.error('Eroare: blockTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['block_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => blockTag.hasOwnProperty(prop) && blockTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul block-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un like
export const validateLikeTag = (likeTag: any): boolean => {
  if (!likeTag || typeof likeTag !== 'object') {
    console.error('Eroare: likeTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['like_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => likeTag.hasOwnProperty(prop) && likeTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul like-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un share
export const validateShareTag = (shareTag: any): boolean => {
  if (!shareTag || typeof shareTag !== 'object') {
    console.error('Eroare: shareTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['share_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => shareTag.hasOwnProperty(prop) && shareTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul share-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un review
export const validateReviewTag = (reviewTag: any): boolean => {
  if (!reviewTag || typeof reviewTag !== 'object') {
    console.error('Eroare: reviewTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['review_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reviewTag.hasOwnProperty(prop) && reviewTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul review-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un favorit
export const validateFavoriteTag = (favoriteTag: any): boolean => {
  if (!favoriteTag || typeof favoriteTag !== 'object') {
    console.error('Eroare: favoriteTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['favorite_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => favoriteTag.hasOwnProperty(prop) && favoriteTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul favoritului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup de membri
export const validateGroupMemberTag = (groupMemberTag: any): boolean => {
  if (!groupMemberTag || typeof groupMemberTag !== 'object') {
    console.error('Eroare: groupMemberTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_member_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupMemberTag.hasOwnProperty(prop) && groupMemberTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul membrului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment de grup
export const validateGroupEventTag = (groupEventTag: any): boolean => {
  if (!groupEventTag || typeof groupEventTag !== 'object') {
    console.error('Eroare: groupEventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupEventTag.hasOwnProperty(prop) && groupEventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu de grup
export const validateGroupCommentTag = (groupCommentTag: any): boolean => {
  if (!groupCommentTag || typeof groupCommentTag !== 'object') {
    console.error('Eroare: groupCommentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupCommentTag.hasOwnProperty(prop) && groupCommentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post de grup
export const validateGroupPostTag = (groupPostTag: any): boolean => {
  if (!groupPostTag || typeof groupPostTag !== 'object') {
    console.error('Eroare: groupPostTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupPostTag.hasOwnProperty(prop) && groupPostTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post
export const validatePostTag = (postTag: any): boolean => {
  if (!postTag || typeof postTag !== 'object') {
    console.error('Eroare: postTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => postTag.hasOwnProperty(prop) && postTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post
export const validatePost = (post: any): boolean => {
  if (!post || typeof post !== 'object') {
    console.error('Eroare: post nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => post.hasOwnProperty(prop) && post[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post de grup
export const validateGroupPost = (groupPost: any): boolean => {
  if (!groupPost || typeof groupPost !== 'object') {
    console.error('Eroare: groupPost nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupPost.hasOwnProperty(prop) && groupPost[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu de grup
export const validateGroupComment = (groupComment: any): boolean => {
  if (!groupComment || typeof groupComment !== 'object') {
    console.error('Eroare: groupComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupComment.hasOwnProperty(prop) && groupComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment de grup
export const validateGroupEvent = (groupEvent: any): boolean => {
  if (!groupEvent || typeof groupEvent !== 'object') {
    console.error('Eroare: groupEvent nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => groupEvent.hasOwnProperty(prop) && groupEvent[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment de grup
export const validateGroupEventMember = (groupEventMember: any): boolean => {
  if (!groupEventMember || typeof groupEventMember !== 'object') {
    console.error('Eroare: groupEventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => groupEventMember.hasOwnProperty(prop) && groupEventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (groupMember: any): boolean => {
  if (!groupMember || typeof groupMember !== 'object') {
    console.error('Eroare: groupMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => groupMember.hasOwnProperty(prop) && groupMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment
export const validateEventMember = (eventMember: any): boolean => {
  if (!eventMember || typeof eventMember !== 'object') {
    console.error('Eroare: eventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => eventMember.hasOwnProperty(prop) && eventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu al unui eveniment
export const validateEventComment = (eventComment: any): boolean => {
  if (!eventComment || typeof eventComment !== 'object') {
    console.error('Eroare: eventComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => eventComment.hasOwnProperty(prop) && eventComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like al unui eveniment
export const validateEventLike = (eventLike: any): boolean => {
  if (!eventLike || typeof eventLike !== 'object') {
    console.error('Eroare: eventLike nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventLike.hasOwnProperty(prop) && eventLike[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Like-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_LIKE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui share al unui eveniment
export const validateEventShare = (eventShare: any): boolean => {
  if (!eventShare || typeof eventShare !== 'object') {
    console.error('Eroare: eventShare nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventShare.hasOwnProperty(prop) && eventShare[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Share-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_SHARE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag al unui eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag
export const validateTag = (tag: any): boolean => {
  if (!tag || typeof tag !== 'object') {
    console.error('Eroare: tag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description'];
  const hasRequiredProps = requiredProps.every(prop => tag.hasOwnProperty(prop) && tag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un anunț
export const validateListingTag = (listingTag: any): boolean => {
  if (!listingTag || typeof listingTag !== 'object') {
    console.error('Eroare: listingTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['listing_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => listingTag.hasOwnProperty(prop) && listingTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul anunțului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un utilizator
export const validateUserTag = (userTag: any): boolean => {
  if (!userTag || typeof userTag !== 'object') {
    console.error('Eroare: userTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => userTag.hasOwnProperty(prop) && userTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul utilizatorului nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup
export const validateGroupTag = (groupTag: any): boolean => {
  if (!groupTag || typeof groupTag !== 'object') {
    console.error('Eroare: groupTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupTag.hasOwnProperty(prop) && groupTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu
export const validateCommentTag = (commentTag: any): boolean => {
  if (!commentTag || typeof commentTag !== 'object') {
    console.error('Eroare: commentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => commentTag.hasOwnProperty(prop) && commentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un mesaj
export const validateMessageTag = (messageTag: any): boolean => {
  if (!messageTag || typeof messageTag !== 'object') {
    console.error('Eroare: messageTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['message_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => messageTag.hasOwnProperty(prop) && messageTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul mesajului nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o conversație
export const validateConversationTag = (conversationTag: any): boolean => {
  if (!conversationTag || typeof conversationTag !== 'object') {
    console.error('Eroare: conversationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['conversation_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => conversationTag.hasOwnProperty(prop) && conversationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul conversației nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o notificare
export const validateNotificationTag = (notificationTag: any): boolean => {
  if (!notificationTag || typeof notificationTag !== 'object') {
    console.error('Eroare: notificationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['notification_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => notificationTag.hasOwnProperty(prop) && notificationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul notificării nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o tranzacție
export const validateTransactionTag = (transactionTag: any): boolean => {
  if (!transactionTag || typeof transactionTag !== 'object') {
    console.error('Eroare: transactionTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['transaction_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => transactionTag.hasOwnProperty(prop) && transactionTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul tranzacției nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un raport
export const validateReportTag = (reportTag: any): boolean => {
  if (!reportTag || typeof reportTag !== 'object') {
    console.error('Eroare: reportTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['report_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reportTag.hasOwnProperty(prop) && reportTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul raportului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un follow
export const validateFollowTag = (followTag: any): boolean => {
  if (!followTag || typeof followTag !== 'object') {
    console.error('Eroare: followTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follow_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => followTag.hasOwnProperty(prop) && followTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul follow-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un block
export const validateBlockTag = (blockTag: any): boolean => {
  if (!blockTag || typeof blockTag !== 'object') {
    console.error('Eroare: blockTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['block_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => blockTag.hasOwnProperty(prop) && blockTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul block-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un like
export const validateLikeTag = (likeTag: any): boolean => {
  if (!likeTag || typeof likeTag !== 'object') {
    console.error('Eroare: likeTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['like_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => likeTag.hasOwnProperty(prop) && likeTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul like-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un share
export const validateShareTag = (shareTag: any): boolean => {
  if (!shareTag || typeof shareTag !== 'object') {
    console.error('Eroare: shareTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['share_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => shareTag.hasOwnProperty(prop) && shareTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul share-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un review
export const validateReviewTag = (reviewTag: any): boolean => {
  if (!reviewTag || typeof reviewTag !== 'object') {
    console.error('Eroare: reviewTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['review_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reviewTag.hasOwnProperty(prop) && reviewTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul review-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un favorit
export const validateFavoriteTag = (favoriteTag: any): boolean => {
  if (!favoriteTag || typeof favoriteTag !== 'object') {
    console.error('Eroare: favoriteTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['favorite_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => favoriteTag.hasOwnProperty(prop) && favoriteTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul favoritului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup de membri
export const validateGroupMemberTag = (groupMemberTag: any): boolean => {
  if (!groupMemberTag || typeof groupMemberTag !== 'object') {
    console.error('Eroare: groupMemberTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_member_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupMemberTag.hasOwnProperty(prop) && groupMemberTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul membrului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment de grup
export const validateGroupEventTag = (groupEventTag: any): boolean => {
  if (!groupEventTag || typeof groupEventTag !== 'object') {
    console.error('Eroare: groupEventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupEventTag.hasOwnProperty(prop) && groupEventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu de grup
export const validateGroupCommentTag = (groupCommentTag: any): boolean => {
  if (!groupCommentTag || typeof groupCommentTag !== 'object') {
    console.error('Eroare: groupCommentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupCommentTag.hasOwnProperty(prop) && groupCommentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post de grup
export const validateGroupPostTag = (groupPostTag: any): boolean => {
  if (!groupPostTag || typeof groupPostTag !== 'object') {
    console.error('Eroare: groupPostTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupPostTag.hasOwnProperty(prop) && groupPostTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post
export const validatePostTag = (postTag: any): boolean => {
  if (!postTag || typeof postTag !== 'object') {
    console.error('Eroare: postTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => postTag.hasOwnProperty(prop) && postTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post
export const validatePost = (post: any): boolean => {
  if (!post || typeof post !== 'object') {
    console.error('Eroare: post nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => post.hasOwnProperty(prop) && post[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post de grup
export const validateGroupPost = (groupPost: any): boolean => {
  if (!groupPost || typeof groupPost !== 'object') {
    console.error('Eroare: groupPost nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupPost.hasOwnProperty(prop) && groupPost[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu de grup
export const validateGroupComment = (groupComment: any): boolean => {
  if (!groupComment || typeof groupComment !== 'object') {
    console.error('Eroare: groupComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupComment.hasOwnProperty(prop) && groupComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment de grup
export const validateGroupEvent = (groupEvent: any): boolean => {
  if (!groupEvent || typeof groupEvent !== 'object') {
    console.error('Eroare: groupEvent nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => groupEvent.hasOwnProperty(prop) && groupEvent[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment de grup
export const validateGroupEventMember = (groupEventMember: any): boolean => {
  if (!groupEventMember || typeof groupEventMember !== 'object') {
    console.error('Eroare: groupEventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => groupEventMember.hasOwnProperty(prop) && groupEventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (groupMember: any): boolean => {
  if (!groupMember || typeof groupMember !== 'object') {
    console.error('Eroare: groupMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => groupMember.hasOwnProperty(prop) && groupMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment
export const validateEventMember = (eventMember: any): boolean => {
  if (!eventMember || typeof eventMember !== 'object') {
    console.error('Eroare: eventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => eventMember.hasOwnProperty(prop) && eventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu al unui eveniment
export const validateEventComment = (eventComment: any): boolean => {
  if (!eventComment || typeof eventComment !== 'object') {
    console.error('Eroare: eventComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => eventComment.hasOwnProperty(prop) && eventComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like al unui eveniment
export const validateEventLike = (eventLike: any): boolean => {
  if (!eventLike || typeof eventLike !== 'object') {
    console.error('Eroare: eventLike nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventLike.hasOwnProperty(prop) && eventLike[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Like-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_LIKE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui share al unui eveniment
export const validateEventShare = (eventShare: any): boolean => {
  if (!eventShare || typeof eventShare !== 'object') {
    console.error('Eroare: eventShare nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventShare.hasOwnProperty(prop) && eventShare[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Share-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_SHARE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag al unui eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag
export const validateTag = (tag: any): boolean => {
  if (!tag || typeof tag !== 'object') {
    console.error('Eroare: tag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description'];
  const hasRequiredProps = requiredProps.every(prop => tag.hasOwnProperty(prop) && tag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un anunț
export const validateListingTag = (listingTag: any): boolean => {
  if (!listingTag || typeof listingTag !== 'object') {
    console.error('Eroare: listingTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['listing_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => listingTag.hasOwnProperty(prop) && listingTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul anunțului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un utilizator
export const validateUserTag = (userTag: any): boolean => {
  if (!userTag || typeof userTag !== 'object') {
    console.error('Eroare: userTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => userTag.hasOwnProperty(prop) && userTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul utilizatorului nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup
export const validateGroupTag = (groupTag: any): boolean => {
  if (!groupTag || typeof groupTag !== 'object') {
    console.error('Eroare: groupTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupTag.hasOwnProperty(prop) && groupTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu
export const validateCommentTag = (commentTag: any): boolean => {
  if (!commentTag || typeof commentTag !== 'object') {
    console.error('Eroare: commentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => commentTag.hasOwnProperty(prop) && commentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un mesaj
export const validateMessageTag = (messageTag: any): boolean => {
  if (!messageTag || typeof messageTag !== 'object') {
    console.error('Eroare: messageTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['message_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => messageTag.hasOwnProperty(prop) && messageTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul mesajului nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o conversație
export const validateConversationTag = (conversationTag: any): boolean => {
  if (!conversationTag || typeof conversationTag !== 'object') {
    console.error('Eroare: conversationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['conversation_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => conversationTag.hasOwnProperty(prop) && conversationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul conversației nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o notificare
export const validateNotificationTag = (notificationTag: any): boolean => {
  if (!notificationTag || typeof notificationTag !== 'object') {
    console.error('Eroare: notificationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['notification_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => notificationTag.hasOwnProperty(prop) && notificationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul notificării nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o tranzacție
export const validateTransactionTag = (transactionTag: any): boolean => {
  if (!transactionTag || typeof transactionTag !== 'object') {
    console.error('Eroare: transactionTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['transaction_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => transactionTag.hasOwnProperty(prop) && transactionTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul tranzacției nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un raport
export const validateReportTag = (reportTag: any): boolean => {
  if (!reportTag || typeof reportTag !== 'object') {
    console.error('Eroare: reportTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['report_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reportTag.hasOwnProperty(prop) && reportTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul raportului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un follow
export const validateFollowTag = (followTag: any): boolean => {
  if (!followTag || typeof followTag !== 'object') {
    console.error('Eroare: followTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follow_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => followTag.hasOwnProperty(prop) && followTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul follow-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un block
export const validateBlockTag = (blockTag: any): boolean => {
  if (!blockTag || typeof blockTag !== 'object') {
    console.error('Eroare: blockTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['block_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => blockTag.hasOwnProperty(prop) && blockTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul block-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un like
export const validateLikeTag = (likeTag: any): boolean => {
  if (!likeTag || typeof likeTag !== 'object') {
    console.error('Eroare: likeTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['like_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => likeTag.hasOwnProperty(prop) && likeTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul like-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un share
export const validateShareTag = (shareTag: any): boolean => {
  if (!shareTag || typeof shareTag !== 'object') {
    console.error('Eroare: shareTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['share_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => shareTag.hasOwnProperty(prop) && shareTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul share-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un review
export const validateReviewTag = (reviewTag: any): boolean => {
  if (!reviewTag || typeof reviewTag !== 'object') {
    console.error('Eroare: reviewTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['review_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reviewTag.hasOwnProperty(prop) && reviewTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul review-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un favorit
export const validateFavoriteTag = (favoriteTag: any): boolean => {
  if (!favoriteTag || typeof favoriteTag !== 'object') {
    console.error('Eroare: favoriteTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['favorite_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => favoriteTag.hasOwnProperty(prop) && favoriteTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul favoritului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup de membri
export const validateGroupMemberTag = (groupMemberTag: any): boolean => {
  if (!groupMemberTag || typeof groupMemberTag !== 'object') {
    console.error('Eroare: groupMemberTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_member_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupMemberTag.hasOwnProperty(prop) && groupMemberTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul membrului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment de grup
export const validateGroupEventTag = (groupEventTag: any): boolean => {
  if (!groupEventTag || typeof groupEventTag !== 'object') {
    console.error('Eroare: groupEventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupEventTag.hasOwnProperty(prop) && groupEventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu de grup
export const validateGroupCommentTag = (groupCommentTag: any): boolean => {
  if (!groupCommentTag || typeof groupCommentTag !== 'object') {
    console.error('Eroare: groupCommentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupCommentTag.hasOwnProperty(prop) && groupCommentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post de grup
export const validateGroupPostTag = (groupPostTag: any): boolean => {
  if (!groupPostTag || typeof groupPostTag !== 'object') {
    console.error('Eroare: groupPostTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupPostTag.hasOwnProperty(prop) && groupPostTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post
export const validatePostTag = (postTag: any): boolean => {
  if (!postTag || typeof postTag !== 'object') {
    console.error('Eroare: postTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => postTag.hasOwnProperty(prop) && postTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post
export const validatePost = (post: any): boolean => {
  if (!post || typeof post !== 'object') {
    console.error('Eroare: post nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => post.hasOwnProperty(prop) && post[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post de grup
export const validateGroupPost = (groupPost: any): boolean => {
  if (!groupPost || typeof groupPost !== 'object') {
    console.error('Eroare: groupPost nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupPost.hasOwnProperty(prop) && groupPost[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu de grup
export const validateGroupComment = (groupComment: any): boolean => {
  if (!groupComment || typeof groupComment !== 'object') {
    console.error('Eroare: groupComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupComment.hasOwnProperty(prop) && groupComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment de grup
export const validateGroupEvent = (groupEvent: any): boolean => {
  if (!groupEvent || typeof groupEvent !== 'object') {
    console.error('Eroare: groupEvent nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => groupEvent.hasOwnProperty(prop) && groupEvent[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment de grup
export const validateGroupEventMember = (groupEventMember: any): boolean => {
  if (!groupEventMember || typeof groupEventMember !== 'object') {
    console.error('Eroare: groupEventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => groupEventMember.hasOwnProperty(prop) && groupEventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (groupMember: any): boolean => {
  if (!groupMember || typeof groupMember !== 'object') {
    console.error('Eroare: groupMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => groupMember.hasOwnProperty(prop) && groupMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment
export const validateEventMember = (eventMember: any): boolean => {
  if (!eventMember || typeof eventMember !== 'object') {
    console.error('Eroare: eventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => eventMember.hasOwnProperty(prop) && eventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu al unui eveniment
export const validateEventComment = (eventComment: any): boolean => {
  if (!eventComment || typeof eventComment !== 'object') {
    console.error('Eroare: eventComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => eventComment.hasOwnProperty(prop) && eventComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like al unui eveniment
export const validateEventLike = (eventLike: any): boolean => {
  if (!eventLike || typeof eventLike !== 'object') {
    console.error('Eroare: eventLike nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventLike.hasOwnProperty(prop) && eventLike[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Like-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_LIKE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui share al unui eveniment
export const validateEventShare = (eventShare: any): boolean => {
  if (!eventShare || typeof eventShare !== 'object') {
    console.error('Eroare: eventShare nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventShare.hasOwnProperty(prop) && eventShare[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Share-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_SHARE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag al unui eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag
export const validateTag = (tag: any): boolean => {
  if (!tag || typeof tag !== 'object') {
    console.error('Eroare: tag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description'];
  const hasRequiredProps = requiredProps.every(prop => tag.hasOwnProperty(prop) && tag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un anunț
export const validateListingTag = (listingTag: any): boolean => {
  if (!listingTag || typeof listingTag !== 'object') {
    console.error('Eroare: listingTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['listing_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => listingTag.hasOwnProperty(prop) && listingTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul anunțului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un utilizator
export const validateUserTag = (userTag: any): boolean => {
  if (!userTag || typeof userTag !== 'object') {
    console.error('Eroare: userTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => userTag.hasOwnProperty(prop) && userTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul utilizatorului nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup
export const validateGroupTag = (groupTag: any): boolean => {
  if (!groupTag || typeof groupTag !== 'object') {
    console.error('Eroare: groupTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupTag.hasOwnProperty(prop) && groupTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu
export const validateCommentTag = (commentTag: any): boolean => {
  if (!commentTag || typeof commentTag !== 'object') {
    console.error('Eroare: commentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => commentTag.hasOwnProperty(prop) && commentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un mesaj
export const validateMessageTag = (messageTag: any): boolean => {
  if (!messageTag || typeof messageTag !== 'object') {
    console.error('Eroare: messageTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['message_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => messageTag.hasOwnProperty(prop) && messageTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul mesajului nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o conversație
export const validateConversationTag = (conversationTag: any): boolean => {
  if (!conversationTag || typeof conversationTag !== 'object') {
    console.error('Eroare: conversationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['conversation_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => conversationTag.hasOwnProperty(prop) && conversationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul conversației nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o notificare
export const validateNotificationTag = (notificationTag: any): boolean => {
  if (!notificationTag || typeof notificationTag !== 'object') {
    console.error('Eroare: notificationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['notification_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => notificationTag.hasOwnProperty(prop) && notificationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul notificării nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o tranzacție
export const validateTransactionTag = (transactionTag: any): boolean => {
  if (!transactionTag || typeof transactionTag !== 'object') {
    console.error('Eroare: transactionTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['transaction_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => transactionTag.hasOwnProperty(prop) && transactionTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul tranzacției nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un raport
export const validateReportTag = (reportTag: any): boolean => {
  if (!reportTag || typeof reportTag !== 'object') {
    console.error('Eroare: reportTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['report_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reportTag.hasOwnProperty(prop) && reportTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul raportului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un follow
export const validateFollowTag = (followTag: any): boolean => {
  if (!followTag || typeof followTag !== 'object') {
    console.error('Eroare: followTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follow_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => followTag.hasOwnProperty(prop) && followTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul follow-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un block
export const validateBlockTag = (blockTag: any): boolean => {
  if (!blockTag || typeof blockTag !== 'object') {
    console.error('Eroare: blockTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['block_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => blockTag.hasOwnProperty(prop) && blockTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul block-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un like
export const validateLikeTag = (likeTag: any): boolean => {
  if (!likeTag || typeof likeTag !== 'object') {
    console.error('Eroare: likeTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['like_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => likeTag.hasOwnProperty(prop) && likeTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul like-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un share
export const validateShareTag = (shareTag: any): boolean => {
  if (!shareTag || typeof shareTag !== 'object') {
    console.error('Eroare: shareTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['share_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => shareTag.hasOwnProperty(prop) && shareTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul share-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un review
export const validateReviewTag = (reviewTag: any): boolean => {
  if (!reviewTag || typeof reviewTag !== 'object') {
    console.error('Eroare: reviewTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['review_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reviewTag.hasOwnProperty(prop) && reviewTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul review-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un favorit
export const validateFavoriteTag = (favoriteTag: any): boolean => {
  if (!favoriteTag || typeof favoriteTag !== 'object') {
    console.error('Eroare: favoriteTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['favorite_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => favoriteTag.hasOwnProperty(prop) && favoriteTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul favoritului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup de membri
export const validateGroupMemberTag = (groupMemberTag: any): boolean => {
  if (!groupMemberTag || typeof groupMemberTag !== 'object') {
    console.error('Eroare: groupMemberTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_member_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupMemberTag.hasOwnProperty(prop) && groupMemberTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul membrului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment de grup
export const validateGroupEventTag = (groupEventTag: any): boolean => {
  if (!groupEventTag || typeof groupEventTag !== 'object') {
    console.error('Eroare: groupEventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupEventTag.hasOwnProperty(prop) && groupEventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu de grup
export const validateGroupCommentTag = (groupCommentTag: any): boolean => {
  if (!groupCommentTag || typeof groupCommentTag !== 'object') {
    console.error('Eroare: groupCommentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupCommentTag.hasOwnProperty(prop) && groupCommentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post de grup
export const validateGroupPostTag = (groupPostTag: any): boolean => {
  if (!groupPostTag || typeof groupPostTag !== 'object') {
    console.error('Eroare: groupPostTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupPostTag.hasOwnProperty(prop) && groupPostTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post
export const validatePostTag = (postTag: any): boolean => {
  if (!postTag || typeof postTag !== 'object') {
    console.error('Eroare: postTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => postTag.hasOwnProperty(prop) && postTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post
export const validatePost = (post: any): boolean => {
  if (!post || typeof post !== 'object') {
    console.error('Eroare: post nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => post.hasOwnProperty(prop) && post[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post de grup
export const validateGroupPost = (groupPost: any): boolean => {
  if (!groupPost || typeof groupPost !== 'object') {
    console.error('Eroare: groupPost nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupPost.hasOwnProperty(prop) && groupPost[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu de grup
export const validateGroupComment = (groupComment: any): boolean => {
  if (!groupComment || typeof groupComment !== 'object') {
    console.error('Eroare: groupComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupComment.hasOwnProperty(prop) && groupComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment de grup
export const validateGroupEvent = (groupEvent: any): boolean => {
  if (!groupEvent || typeof groupEvent !== 'object') {
    console.error('Eroare: groupEvent nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => groupEvent.hasOwnProperty(prop) && groupEvent[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment de grup
export const validateGroupEventMember = (groupEventMember: any): boolean => {
  if (!groupEventMember || typeof groupEventMember !== 'object') {
    console.error('Eroare: groupEventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => groupEventMember.hasOwnProperty(prop) && groupEventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (groupMember: any): boolean => {
  if (!groupMember || typeof groupMember !== 'object') {
    console.error('Eroare: groupMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => groupMember.hasOwnProperty(prop) && groupMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment
export const validateEventMember = (eventMember: any): boolean => {
  if (!eventMember || typeof eventMember !== 'object') {
    console.error('Eroare: eventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => eventMember.hasOwnProperty(prop) && eventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu al unui eveniment
export const validateEventComment = (eventComment: any): boolean => {
  if (!eventComment || typeof eventComment !== 'object') {
    console.error('Eroare: eventComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => eventComment.hasOwnProperty(prop) && eventComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like al unui eveniment
export const validateEventLike = (eventLike: any): boolean => {
  if (!eventLike || typeof eventLike !== 'object') {
    console.error('Eroare: eventLike nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventLike.hasOwnProperty(prop) && eventLike[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Like-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_LIKE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui share al unui eveniment
export const validateEventShare = (eventShare: any): boolean => {
  if (!eventShare || typeof eventShare !== 'object') {
    console.error('Eroare: eventShare nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventShare.hasOwnProperty(prop) && eventShare[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Share-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_SHARE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag al unui eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag
export const validateTag = (tag: any): boolean => {
  if (!tag || typeof tag !== 'object') {
    console.error('Eroare: tag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description'];
  const hasRequiredProps = requiredProps.every(prop => tag.hasOwnProperty(prop) && tag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un anunț
export const validateListingTag = (listingTag: any): boolean => {
  if (!listingTag || typeof listingTag !== 'object') {
    console.error('Eroare: listingTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['listing_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => listingTag.hasOwnProperty(prop) && listingTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul anunțului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un utilizator
export const validateUserTag = (userTag: any): boolean => {
  if (!userTag || typeof userTag !== 'object') {
    console.error('Eroare: userTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => userTag.hasOwnProperty(prop) && userTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul utilizatorului nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup
export const validateGroupTag = (groupTag: any): boolean => {
  if (!groupTag || typeof groupTag !== 'object') {
    console.error('Eroare: groupTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupTag.hasOwnProperty(prop) && groupTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu
export const validateCommentTag = (commentTag: any): boolean => {
  if (!commentTag || typeof commentTag !== 'object') {
    console.error('Eroare: commentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => commentTag.hasOwnProperty(prop) && commentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un mesaj
export const validateMessageTag = (messageTag: any): boolean => {
  if (!messageTag || typeof messageTag !== 'object') {
    console.error('Eroare: messageTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['message_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => messageTag.hasOwnProperty(prop) && messageTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul mesajului nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o conversație
export const validateConversationTag = (conversationTag: any): boolean => {
  if (!conversationTag || typeof conversationTag !== 'object') {
    console.error('Eroare: conversationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['conversation_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => conversationTag.hasOwnProperty(prop) && conversationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul conversației nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o notificare
export const validateNotificationTag = (notificationTag: any): boolean => {
  if (!notificationTag || typeof notificationTag !== 'object') {
    console.error('Eroare: notificationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['notification_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => notificationTag.hasOwnProperty(prop) && notificationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul notificării nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o tranzacție
export const validateTransactionTag = (transactionTag: any): boolean => {
  if (!transactionTag || typeof transactionTag !== 'object') {
    console.error('Eroare: transactionTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['transaction_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => transactionTag.hasOwnProperty(prop) && transactionTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul tranzacției nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un raport
export const validateReportTag = (reportTag: any): boolean => {
  if (!reportTag || typeof reportTag !== 'object') {
    console.error('Eroare: reportTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['report_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reportTag.hasOwnProperty(prop) && reportTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul raportului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un follow
export const validateFollowTag = (followTag: any): boolean => {
  if (!followTag || typeof followTag !== 'object') {
    console.error('Eroare: followTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follow_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => followTag.hasOwnProperty(prop) && followTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul follow-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un block
export const validateBlockTag = (blockTag: any): boolean => {
  if (!blockTag || typeof blockTag !== 'object') {
    console.error('Eroare: blockTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['block_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => blockTag.hasOwnProperty(prop) && blockTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul block-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un like
export const validateLikeTag = (likeTag: any): boolean => {
  if (!likeTag || typeof likeTag !== 'object') {
    console.error('Eroare: likeTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['like_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => likeTag.hasOwnProperty(prop) && likeTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul like-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un share
export const validateShareTag = (shareTag: any): boolean => {
  if (!shareTag || typeof shareTag !== 'object') {
    console.error('Eroare: shareTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['share_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => shareTag.hasOwnProperty(prop) && shareTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul share-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un review
export const validateReviewTag = (reviewTag: any): boolean => {
  if (!reviewTag || typeof reviewTag !== 'object') {
    console.error('Eroare: reviewTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['review_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reviewTag.hasOwnProperty(prop) && reviewTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul review-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un favorit
export const validateFavoriteTag = (favoriteTag: any): boolean => {
  if (!favoriteTag || typeof favoriteTag !== 'object') {
    console.error('Eroare: favoriteTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['favorite_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => favoriteTag.hasOwnProperty(prop) && favoriteTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul favoritului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup de membri
export const validateGroupMemberTag = (groupMemberTag: any): boolean => {
  if (!groupMemberTag || typeof groupMemberTag !== 'object') {
    console.error('Eroare: groupMemberTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_member_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupMemberTag.hasOwnProperty(prop) && groupMemberTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul membrului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment de grup
export const validateGroupEventTag = (groupEventTag: any): boolean => {
  if (!groupEventTag || typeof groupEventTag !== 'object') {
    console.error('Eroare: groupEventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupEventTag.hasOwnProperty(prop) && groupEventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu de grup
export const validateGroupCommentTag = (groupCommentTag: any): boolean => {
  if (!groupCommentTag || typeof groupCommentTag !== 'object') {
    console.error('Eroare: groupCommentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupCommentTag.hasOwnProperty(prop) && groupCommentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post de grup
export const validateGroupPostTag = (groupPostTag: any): boolean => {
  if (!groupPostTag || typeof groupPostTag !== 'object') {
    console.error('Eroare: groupPostTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupPostTag.hasOwnProperty(prop) && groupPostTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post
export const validatePostTag = (postTag: any): boolean => {
  if (!postTag || typeof postTag !== 'object') {
    console.error('Eroare: postTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => postTag.hasOwnProperty(prop) && postTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post
export const validatePost = (post: any): boolean => {
  if (!post || typeof post !== 'object') {
    console.error('Eroare: post nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => post.hasOwnProperty(prop) && post[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post de grup
export const validateGroupPost = (groupPost: any): boolean => {
  if (!groupPost || typeof groupPost !== 'object') {
    console.error('Eroare: groupPost nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupPost.hasOwnProperty(prop) && groupPost[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu de grup
export const validateGroupComment = (groupComment: any): boolean => {
  if (!groupComment || typeof groupComment !== 'object') {
    console.error('Eroare: groupComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupComment.hasOwnProperty(prop) && groupComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment de grup
export const validateGroupEvent = (groupEvent: any): boolean => {
  if (!groupEvent || typeof groupEvent !== 'object') {
    console.error('Eroare: groupEvent nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => groupEvent.hasOwnProperty(prop) && groupEvent[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment de grup
export const validateGroupEventMember = (groupEventMember: any): boolean => {
  if (!groupEventMember || typeof groupEventMember !== 'object') {
    console.error('Eroare: groupEventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => groupEventMember.hasOwnProperty(prop) && groupEventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (groupMember: any): boolean => {
  if (!groupMember || typeof groupMember !== 'object') {
    console.error('Eroare: groupMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => groupMember.hasOwnProperty(prop) && groupMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment
export const validateEventMember = (eventMember: any): boolean => {
  if (!eventMember || typeof eventMember !== 'object') {
    console.error('Eroare: eventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => eventMember.hasOwnProperty(prop) && eventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu al unui eveniment
export const validateEventComment = (eventComment: any): boolean => {
  if (!eventComment || typeof eventComment !== 'object') {
    console.error('Eroare: eventComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => eventComment.hasOwnProperty(prop) && eventComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like al unui eveniment
export const validateEventLike = (eventLike: any): boolean => {
  if (!eventLike || typeof eventLike !== 'object') {
    console.error('Eroare: eventLike nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventLike.hasOwnProperty(prop) && eventLike[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Like-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_LIKE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui share al unui eveniment
export const validateEventShare = (eventShare: any): boolean => {
  if (!eventShare || typeof eventShare !== 'object') {
    console.error('Eroare: eventShare nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventShare.hasOwnProperty(prop) && eventShare[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Share-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_SHARE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag al unui eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag
export const validateTag = (tag: any): boolean => {
  if (!tag || typeof tag !== 'object') {
    console.error('Eroare: tag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description'];
  const hasRequiredProps = requiredProps.every(prop => tag.hasOwnProperty(prop) && tag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un anunț
export const validateListingTag = (listingTag: any): boolean => {
  if (!listingTag || typeof listingTag !== 'object') {
    console.error('Eroare: listingTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['listing_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => listingTag.hasOwnProperty(prop) && listingTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul anunțului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un utilizator
export const validateUserTag = (userTag: any): boolean => {
  if (!userTag || typeof userTag !== 'object') {
    console.error('Eroare: userTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => userTag.hasOwnProperty(prop) && userTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul utilizatorului nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup
export const validateGroupTag = (groupTag: any): boolean => {
  if (!groupTag || typeof groupTag !== 'object') {
    console.error('Eroare: groupTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupTag.hasOwnProperty(prop) && groupTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu
export const validateCommentTag = (commentTag: any): boolean => {
  if (!commentTag || typeof commentTag !== 'object') {
    console.error('Eroare: commentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => commentTag.hasOwnProperty(prop) && commentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un mesaj
export const validateMessageTag = (messageTag: any): boolean => {
  if (!messageTag || typeof messageTag !== 'object') {
    console.error('Eroare: messageTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['message_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => messageTag.hasOwnProperty(prop) && messageTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul mesajului nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o conversație
export const validateConversationTag = (conversationTag: any): boolean => {
  if (!conversationTag || typeof conversationTag !== 'object') {
    console.error('Eroare: conversationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['conversation_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => conversationTag.hasOwnProperty(prop) && conversationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul conversației nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o notificare
export const validateNotificationTag = (notificationTag: any): boolean => {
  if (!notificationTag || typeof notificationTag !== 'object') {
    console.error('Eroare: notificationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['notification_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => notificationTag.hasOwnProperty(prop) && notificationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul notificării nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o tranzacție
export const validateTransactionTag = (transactionTag: any): boolean => {
  if (!transactionTag || typeof transactionTag !== 'object') {
    console.error('Eroare: transactionTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['transaction_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => transactionTag.hasOwnProperty(prop) && transactionTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul tranzacției nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un raport
export const validateReportTag = (reportTag: any): boolean => {
  if (!reportTag || typeof reportTag !== 'object') {
    console.error('Eroare: reportTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['report_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reportTag.hasOwnProperty(prop) && reportTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul raportului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un follow
export const validateFollowTag = (followTag: any): boolean => {
  if (!followTag || typeof followTag !== 'object') {
    console.error('Eroare: followTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follow_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => followTag.hasOwnProperty(prop) && followTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul follow-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un block
export const validateBlockTag = (blockTag: any): boolean => {
  if (!blockTag || typeof blockTag !== 'object') {
    console.error('Eroare: blockTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['block_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => blockTag.hasOwnProperty(prop) && blockTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul block-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un like
export const validateLikeTag = (likeTag: any): boolean => {
  if (!likeTag || typeof likeTag !== 'object') {
    console.error('Eroare: likeTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['like_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => likeTag.hasOwnProperty(prop) && likeTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul like-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un share
export const validateShareTag = (shareTag: any): boolean => {
  if (!shareTag || typeof shareTag !== 'object') {
    console.error('Eroare: shareTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['share_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => shareTag.hasOwnProperty(prop) && shareTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul share-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un review
export const validateReviewTag = (reviewTag: any): boolean => {
  if (!reviewTag || typeof reviewTag !== 'object') {
    console.error('Eroare: reviewTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['review_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reviewTag.hasOwnProperty(prop) && reviewTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul review-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un favorit
export const validateFavoriteTag = (favoriteTag: any): boolean => {
  if (!favoriteTag || typeof favoriteTag !== 'object') {
    console.error('Eroare: favoriteTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['favorite_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => favoriteTag.hasOwnProperty(prop) && favoriteTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul favoritului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup de membri
export const validateGroupMemberTag = (groupMemberTag: any): boolean => {
  if (!groupMemberTag || typeof groupMemberTag !== 'object') {
    console.error('Eroare: groupMemberTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_member_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupMemberTag.hasOwnProperty(prop) && groupMemberTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul membrului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment de grup
export const validateGroupEventTag = (groupEventTag: any): boolean => {
  if (!groupEventTag || typeof groupEventTag !== 'object') {
    console.error('Eroare: groupEventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupEventTag.hasOwnProperty(prop) && groupEventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu de grup
export const validateGroupCommentTag = (groupCommentTag: any): boolean => {
  if (!groupCommentTag || typeof groupCommentTag !== 'object') {
    console.error('Eroare: groupCommentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupCommentTag.hasOwnProperty(prop) && groupCommentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post de grup
export const validateGroupPostTag = (groupPostTag: any): boolean => {
  if (!groupPostTag || typeof groupPostTag !== 'object') {
    console.error('Eroare: groupPostTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupPostTag.hasOwnProperty(prop) && groupPostTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post
export const validatePostTag = (postTag: any): boolean => {
  if (!postTag || typeof postTag !== 'object') {
    console.error('Eroare: postTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => postTag.hasOwnProperty(prop) && postTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post
export const validatePost = (post: any): boolean => {
  if (!post || typeof post !== 'object') {
    console.error('Eroare: post nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => post.hasOwnProperty(prop) && post[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post de grup
export const validateGroupPost = (groupPost: any): boolean => {
  if (!groupPost || typeof groupPost !== 'object') {
    console.error('Eroare: groupPost nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupPost.hasOwnProperty(prop) && groupPost[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu de grup
export const validateGroupComment = (groupComment: any): boolean => {
  if (!groupComment || typeof groupComment !== 'object') {
    console.error('Eroare: groupComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupComment.hasOwnProperty(prop) && groupComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment de grup
export const validateGroupEvent = (groupEvent: any): boolean => {
  if (!groupEvent || typeof groupEvent !== 'object') {
    console.error('Eroare: groupEvent nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => groupEvent.hasOwnProperty(prop) && groupEvent[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment de grup
export const validateGroupEventMember = (groupEventMember: any): boolean => {
  if (!groupEventMember || typeof groupEventMember !== 'object') {
    console.error('Eroare: groupEventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => groupEventMember.hasOwnProperty(prop) && groupEventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (groupMember: any): boolean => {
  if (!groupMember || typeof groupMember !== 'object') {
    console.error('Eroare: groupMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => groupMember.hasOwnProperty(prop) && groupMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment
export const validateEventMember = (eventMember: any): boolean => {
  if (!eventMember || typeof eventMember !== 'object') {
    console.error('Eroare: eventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => eventMember.hasOwnProperty(prop) && eventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu al unui eveniment
export const validateEventComment = (eventComment: any): boolean => {
  if (!eventComment || typeof eventComment !== 'object') {
    console.error('Eroare: eventComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => eventComment.hasOwnProperty(prop) && eventComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like al unui eveniment
export const validateEventLike = (eventLike: any): boolean => {
  if (!eventLike || typeof eventLike !== 'object') {
    console.error('Eroare: eventLike nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventLike.hasOwnProperty(prop) && eventLike[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Like-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_LIKE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui share al unui eveniment
export const validateEventShare = (eventShare: any): boolean => {
  if (!eventShare || typeof eventShare !== 'object') {
    console.error('Eroare: eventShare nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id'];
  const hasRequiredProps = requiredProps.every(prop => eventShare.hasOwnProperty(prop) && eventShare[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Share-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_SHARE_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag al unui eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag
export const validateTag = (tag: any): boolean => {
  if (!tag || typeof tag !== 'object') {
    console.error('Eroare: tag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description'];
  const hasRequiredProps = requiredProps.every(prop => tag.hasOwnProperty(prop) && tag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul nu are toate proprietățile obligatorii');
    triggerError('INVALID_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un anunț
export const validateListingTag = (listingTag: any): boolean => {
  if (!listingTag || typeof listingTag !== 'object') {
    console.error('Eroare: listingTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['listing_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => listingTag.hasOwnProperty(prop) && listingTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul anunțului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LISTING_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un utilizator
export const validateUserTag = (userTag: any): boolean => {
  if (!userTag || typeof userTag !== 'object') {
    console.error('Eroare: userTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => userTag.hasOwnProperty(prop) && userTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul utilizatorului nu are toate proprietățile obligatorii');
    triggerError('INVALID_USER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup
export const validateGroupTag = (groupTag: any): boolean => {
  if (!groupTag || typeof groupTag !== 'object') {
    console.error('Eroare: groupTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupTag.hasOwnProperty(prop) && groupTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment
export const validateEventTag = (eventTag: any): boolean => {
  if (!eventTag || typeof eventTag !== 'object') {
    console.error('Eroare: eventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => eventTag.hasOwnProperty(prop) && eventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu
export const validateCommentTag = (commentTag: any): boolean => {
  if (!commentTag || typeof commentTag !== 'object') {
    console.error('Eroare: commentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => commentTag.hasOwnProperty(prop) && commentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului nu are toate proprietățile obligatorii');
    triggerError('INVALID_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un mesaj
export const validateMessageTag = (messageTag: any): boolean => {
  if (!messageTag || typeof messageTag !== 'object') {
    console.error('Eroare: messageTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['message_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => messageTag.hasOwnProperty(prop) && messageTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul mesajului nu are toate proprietățile obligatorii');
    triggerError('INVALID_MESSAGE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o conversație
export const validateConversationTag = (conversationTag: any): boolean => {
  if (!conversationTag || typeof conversationTag !== 'object') {
    console.error('Eroare: conversationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['conversation_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => conversationTag.hasOwnProperty(prop) && conversationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul conversației nu are toate proprietățile obligatorii');
    triggerError('INVALID_CONVERSATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o notificare
export const validateNotificationTag = (notificationTag: any): boolean => {
  if (!notificationTag || typeof notificationTag !== 'object') {
    console.error('Eroare: notificationTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['notification_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => notificationTag.hasOwnProperty(prop) && notificationTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul notificării nu are toate proprietățile obligatorii');
    triggerError('INVALID_NOTIFICATION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru o tranzacție
export const validateTransactionTag = (transactionTag: any): boolean => {
  if (!transactionTag || typeof transactionTag !== 'object') {
    console.error('Eroare: transactionTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['transaction_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => transactionTag.hasOwnProperty(prop) && transactionTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul tranzacției nu are toate proprietățile obligatorii');
    triggerError('INVALID_TRANSACTION_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un raport
export const validateReportTag = (reportTag: any): boolean => {
  if (!reportTag || typeof reportTag !== 'object') {
    console.error('Eroare: reportTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['report_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reportTag.hasOwnProperty(prop) && reportTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul raportului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REPORT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un follow
export const validateFollowTag = (followTag: any): boolean => {
  if (!followTag || typeof followTag !== 'object') {
    console.error('Eroare: followTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['follow_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => followTag.hasOwnProperty(prop) && followTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul follow-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FOLLOW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un block
export const validateBlockTag = (blockTag: any): boolean => {
  if (!blockTag || typeof blockTag !== 'object') {
    console.error('Eroare: blockTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['block_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => blockTag.hasOwnProperty(prop) && blockTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul block-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_BLOCK_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un like
export const validateLikeTag = (likeTag: any): boolean => {
  if (!likeTag || typeof likeTag !== 'object') {
    console.error('Eroare: likeTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['like_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => likeTag.hasOwnProperty(prop) && likeTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul like-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_LIKE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un share
export const validateShareTag = (shareTag: any): boolean => {
  if (!shareTag || typeof shareTag !== 'object') {
    console.error('Eroare: shareTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['share_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => shareTag.hasOwnProperty(prop) && shareTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul share-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_SHARE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un review
export const validateReviewTag = (reviewTag: any): boolean => {
  if (!reviewTag || typeof reviewTag !== 'object') {
    console.error('Eroare: reviewTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['review_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => reviewTag.hasOwnProperty(prop) && reviewTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul review-ului nu are toate proprietățile obligatorii');
    triggerError('INVALID_REVIEW_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un favorit
export const validateFavoriteTag = (favoriteTag: any): boolean => {
  if (!favoriteTag || typeof favoriteTag !== 'object') {
    console.error('Eroare: favoriteTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['favorite_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => favoriteTag.hasOwnProperty(prop) && favoriteTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul favoritului nu are toate proprietățile obligatorii');
    triggerError('INVALID_FAVORITE_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un grup de membri
export const validateGroupMemberTag = (groupMemberTag: any): boolean => {
  if (!groupMemberTag || typeof groupMemberTag !== 'object') {
    console.error('Eroare: groupMemberTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_member_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupMemberTag.hasOwnProperty(prop) && groupMemberTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul membrului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un eveniment de grup
export const validateGroupEventTag = (groupEventTag: any): boolean => {
  if (!groupEventTag || typeof groupEventTag !== 'object') {
    console.error('Eroare: groupEventTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupEventTag.hasOwnProperty(prop) && groupEventTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un comentariu de grup
export const validateGroupCommentTag = (groupCommentTag: any): boolean => {
  if (!groupCommentTag || typeof groupCommentTag !== 'object') {
    console.error('Eroare: groupCommentTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_comment_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupCommentTag.hasOwnProperty(prop) && groupCommentTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul comentariului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post de grup
export const validateGroupPostTag = (groupPostTag: any): boolean => {
  if (!groupPostTag || typeof groupPostTag !== 'object') {
    console.error('Eroare: groupPostTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => groupPostTag.hasOwnProperty(prop) && groupPostTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui tag pentru un post
export const validatePostTag = (postTag: any): boolean => {
  if (!postTag || typeof postTag !== 'object') {
    console.error('Eroare: postTag nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['post_id', 'tag_id'];
  const hasRequiredProps = requiredProps.every(prop => postTag.hasOwnProperty(prop) && postTag[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Tag-ul postului nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_TAG_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post
export const validatePost = (post: any): boolean => {
  if (!post || typeof post !== 'object') {
    console.error('Eroare: post nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => post.hasOwnProperty(prop) && post[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul nu are toate proprietățile obligatorii');
    triggerError('INVALID_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui post de grup
export const validateGroupPost = (groupPost: any): boolean => {
  if (!groupPost || typeof groupPost !== 'object') {
    console.error('Eroare: groupPost nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupPost.hasOwnProperty(prop) && groupPost[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Postul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_POST_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu de grup
export const validateGroupComment = (groupComment: any): boolean => {
  if (!groupComment || typeof groupComment !== 'object') {
    console.error('Eroare: groupComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => groupComment.hasOwnProperty(prop) && groupComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment de grup
export const validateGroupEvent = (groupEvent: any): boolean => {
  if (!groupEvent || typeof groupEvent !== 'object') {
    console.error('Eroare: groupEvent nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => groupEvent.hasOwnProperty(prop) && groupEvent[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment de grup
export const validateGroupEventMember = (groupEventMember: any): boolean => {
  if (!groupEventMember || typeof groupEventMember !== 'object') {
    console.error('Eroare: groupEventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => groupEventMember.hasOwnProperty(prop) && groupEventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui grup
export const validateGroupMember = (groupMember: any): boolean => {
  if (!groupMember || typeof groupMember !== 'object') {
    console.error('Eroare: groupMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['group_id', 'user_id', 'role'];
  const hasRequiredProps = requiredProps.every(prop => groupMember.hasOwnProperty(prop) && groupMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul grupului nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui grup
export const validateGroup = (group: any): boolean => {
  if (!group || typeof group !== 'object') {
    console.error('Eroare: group nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'owner_id'];
  const hasRequiredProps = requiredProps.every(prop => group.hasOwnProperty(prop) && group[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Grupul nu are toate proprietățile obligatorii');
    triggerError('INVALID_GROUP_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui eveniment
export const validateEvent = (event: any): boolean => {
  if (!event || typeof event !== 'object') {
    console.error('Eroare: event nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['name', 'description', 'date', 'location'];
  const hasRequiredProps = requiredProps.every(prop => event.hasOwnProperty(prop) && event[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Evenimentul nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui membru al unui eveniment
export const validateEventMember = (eventMember: any): boolean => {
  if (!eventMember || typeof eventMember !== 'object') {
    console.error('Eroare: eventMember nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'status'];
  const hasRequiredProps = requiredProps.every(prop => eventMember.hasOwnProperty(prop) && eventMember[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Membrul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_MEMBER_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui comentariu al unui eveniment
export const validateEventComment = (eventComment: any): boolean => {
  if (!eventComment || typeof eventComment !== 'object') {
    console.error('Eroare: eventComment nu este un obiect valid');
    return false;
  }

  // Verificăm proprietățile obligatorii
  const requiredProps = ['event_id', 'user_id', 'content'];
  const hasRequiredProps = requiredProps.every(prop => eventComment.hasOwnProperty(prop) && eventComment[prop]);
  
  if (!hasRequiredProps) {
    console.error('Eroare: Comentariul evenimentului nu are toate proprietățile obligatorii');
    triggerError('INVALID_EVENT_COMMENT_PROPS');
    return false;
  }

  return true;
};

// Funcție pentru a valida datele unui like al unui eveniment
export const validateEventLike = (eventLike: any): boolean => {
  if (!eventLike ||